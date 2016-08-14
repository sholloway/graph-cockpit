'use strict';

/*
This is the main process of the Electron app. Changes to this file will not
be picked up by the webpack-dev-server.
*/
const electron = require('electron');
const {app, BrowserWindow} = electron;
const {ipcMain} = require('electron');
const WindowManager = require('./src/windows-manager');
let centralWindowManager = WindowManager.WindowsManager.instance(__dirname);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  /*
  Set platform name for the render process, as the NodeJS process appears
  to not be available.
  This can be accessed in the render process via:
  require('electron').remote.getGlobal('appEnv').platform
  */
  global.appEnv = {
    platform: process.platform
  };
	centralWindowManager.createWindow(WindowManager.MAIN_WINDOW);
});

ipcMain.on('launch-window', function(event, windowType){
	centralWindowManager.createWindow(windowType);
});
