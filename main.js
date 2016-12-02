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

const engineArgs = [`-Dlog-level=${config.engine.logging.level}`,
  `-Dengine.graphdb.path=${config.engine.graphdb.path}`,
  '-cp',
  'machine-engine-assembly-0.1.0-deps.jar:machine-engine-assembly-0.1.0.jar', //Consider having a function in the config build this.
  'org.machine.engine.Main'];

const engineWorkingDir = path.join(__dirname, './lib');
const engineOptions = {
  cwd: engineWorkingDir //Current working directory of the child process (Engine).
};

const bootAndGate = new AndGateEmitter();
const terminateAndGate = new AndGateEmitter();

bootAndGate.on('gate-tripped', launchUI);

terminateAndGate.on('gate-tripped', () => {
  app.quit();
});

//Spawn a child process for the machine-engine.
//java -cp machine-engine-assembly-0.1.0-deps.jar:machine-engine-assembly-0.1.0.jar org.machine.engine.Main
const engine = spawn('java', engineArgs, engineOptions);

engine.stdout.on('data', (data) => {
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

engine.stderr.on('data', (data) => {
  console.log(`Node stderr: ${data}`);
});

engine.on('close', (code) => {
  console.log(`Node child process exited with code ${code}`);
  terminateAndGate.emit('inputB');
});

function tellEngine(msg){
  console.log(`Sending message: ${msg}`)
  engine.stdin.write(`${msg}\n`)
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
  engine.stdin.setEncoding('utf-8');
  engine.stdin.write(`SIGHUP\n`);
  engine.stdin.end();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
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
