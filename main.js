'use strict';

/*
This is the main process of the Electron app. Changes to this file will not
be picked up by the webpack-dev-server.
*/
const electron = require('electron');
const {app, BrowserWindow} = electron;
const {ipcMain} = require('electron');
const path = require('path');
const WindowManager = require('./src/windows-manager');
const AndGateEmitter = require('./src/events/gates/AndGateEmitter');
const config = require('./src/config.js');
const spawn = require('child_process').spawn;
const ENGINE_VERSION = config.engine.version
const ENTRY_POINT = config.engine.entry_point
const engineWorkingDir = path.join(__dirname, './lib');
const bootAndGate = new AndGateEmitter();
const terminateAndGate = new AndGateEmitter();
const SecretStoreClient = require('./src/secrets/SecretStoreClient')
const secretStore = new SecretStoreClient("mod89.machine.engine")

let context = {
	engine: null,
	secrets:{
		identityServiceSecret: '',
		webServerPwd: '',
		idenityServicePwd: ''
	}
}

bootAndGate.on('gate-tripped', launchUI);

terminateAndGate.on('gate-tripped', () => {
  app.quit();
});

function startEngineAsync(){
	Promise.all(
		[secretStore.getOrCreateSecret("identity_service.session.secret", 128, context, 'identityServiceSecret'),
		secretStore.getOrCreateSecret("webserver.password", 64, context, 'webServerPwd'),
		secretStore.getOrCreateSecret("identity_service.password", 64, context, 'idenityServicePwd')]
	).then((values) =>{
		let engineArgs = [`-Dlog-level=${config.engine.logging.level}`,
			`-Dengine.graphdb.path=${config.engine.graphdb.path}`,
			`-Dengine.communication.identity_service.session.secret=${context.secrets.identityServiceSecret}`,
			`-Dengine.communication.webserver.password=${context.secrets.webServerPwd}`,
			`-Dengine.communication.identity_service.password=${context.secrets.idenityServicePwd}`,
			'-cp',
			`machine-engine-assembly-${ENGINE_VERSION}-deps.jar:machine-engine-assembly-${ENGINE_VERSION}.jar`,
			ENTRY_POINT];

		let engineOptions = {
		  cwd: engineWorkingDir // Current working directory of the child process (Engine).
		};

		context.engine = spawn('java', engineArgs, engineOptions);

		context.engine.stdout.on('data', (data) => {
		  var msg = data.toString()
		  switch(msg.trim()){
		    case 'ENGINE_READY':{
		      console.log(`Node Received: ${msg}`);
		      bootAndGate.emit('inputA');
		      break;
		    }
		    default:{
		      console.log(`Node Received: ${msg}`);
		    }
		  }
		});

		context.engine.stderr.on('data', (data) => {
		  console.log(`Node stderr: ${data}`);
		});

		context.engine.on('close', (code) => {
		  console.log(`Node child process exited with code ${code}`);
		  terminateAndGate.emit('inputB');
		});
	}).catch((e) => {
		console.log("An error occured while trying to start the engine.")
		console.log(e)
	})
}

startEngineAsync()

function tellEngine(msg){
  console.log(`Sending message: ${msg}`)
  context.engine.stdin.write(`${msg}\n`)
}

let centralWindowManager = WindowManager.WindowsManager.instance(__dirname);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    shutdown();
  }
});

/*
So what I need to do here, is to use another AND gate for termination.
Shutdown sequence:
1. User initiated shutdown of Electron. (What is the event?)
2. Emit to AND gate electron shutdown.
3. Node needs to initiate Engine shutdown.
4. Engine sends termination complete message back to Node.
5. Emit to AND gate electron shutdown.
6. AND gate emit gate-tripp
7. app.quit()
*/
app.on('before-quit', (event) => {
  if(!terminateAndGate.inputATripped()){
    event.preventDefault()
    shutdown();
  }
});

function shutdown(){
  terminateAndGate.emit('inputA');
  context.engine.stdin.setEncoding('utf-8');
  context.engine.stdin.write(`SIGHUP\n`);
  context.engine.stdin.end();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  console.log('Electron Ready');
  bootAndGate.emit('inputB');
});

function launchUI(){
  /*
  Set platform name for the render process, as the NodeJS process appears
  to not be available.
  This can be accessed in the render process via:
  require('electron').remote.getGlobal('appEnv').platform
  */
  console.log(`########################## Launch UI ##########################`);
  global.appEnv = {
    platform: process.platform,
		nodeEnv: process.env
  };
	centralWindowManager.createWindow(WindowManager.MAIN_WINDOW);
}

ipcMain.on('launch-window', function(event, windowType){
	centralWindowManager.createWindow(windowType);
});
