'use strict';

const electron = require('electron');
const {app, BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

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
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

/*
The goal.
* [X] Add License.
* [ ] Electron, React, Webpack Hello World.
* [ ] Create top level menu from React Component.
* [ ] Window Naviagtion via React Routes.
* [ ] Stub out all Menu Items.
* [ ] Stub out all Windows & Flows.
* [ ] Integrate with Engine Harness.
* [ ] Build Authentication Flow.
* [ ] Establish TLS between Cockpit & Engine

Decisions to make.
* [ ] Use a CSS Preprocessor
* [ ] Leverage a UX framework.
*/
