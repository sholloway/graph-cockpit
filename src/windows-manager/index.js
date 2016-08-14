const electron = require('electron');
const {BrowserWindow} = electron;
const shortid = require('shortid');

const MAIN_WINDOW = 'MAIN_WINDOW';
const ACTIVITY_LOG_WINDOW = 'ACTIVITY_LOG_WINDOW';
const TABLE_WINDOW = 'TABLE_WINDOW';
const TREE_MAP_WINDOW = 'TREE_MAP_WINDOW';

let windowsManager = {
	instance: function(workingDir){
		let that = {};
		that.workingDir = workingDir;
		that.windows = {
			activityWindow: null,
			tableWindows: {},
			treeMapWindow: null,
			mainWindow: null
		};

		that.createWindow = function(type){
			switch(type){
				case ACTIVITY_LOG_WINDOW:
					that._createActivityWindow();
					break;
				case TABLE_WINDOW:
					that._createTableWindow();
					break;
				case TREE_MAP_WINDOW:
					that._creatTreeWindow();
					break;
				case MAIN_WINDOW:
					that._createMainWindow();
					break;
				default:
					//TODO Need a logging solution.
					console.log("Unknown window type");
			}
		};

		that.destroyAllWindows = function(){};

		that._createActivityWindow= function(){
			if (that.windows.activityWindow == undefined || that.windows.activityWindow == null){
				that.windows.activityWindow = new BrowserWindow({width: 400, height:400});
				that.windows.activityWindow.loadURL('file://' + that.workingDir + '/public/activityWindow.html');
				that.windows.activityWindow.on('close', function(){
					that.windows.activityWindow = null;
				});
			}
		};

		that._createTableWindow= function(){
			let windowContainer = {};
			windowContainer.windowId = shortid.generate();
			windowContainer.newTableWindow = new BrowserWindow({width: 600, height: 600});
			windowContainer.newTableWindow.loadURL('file://' + that.workingDir + '/public/tableWindow.html');
			that.windows.tableWindows[windowContainer.windowId] = windowContainer;
			windowContainer.newTableWindow.on('close', (function(){
				if (that.windows.tableWindows && that.windows.tableWindows.hasOwnProperty(this.windowId)) {
					that.windows.tableWindows[this.windowId] = null;
					delete that.windows.tableWindows[this.windowId];
				}
			}).bind(windowContainer));
		};

		that._creatTreeWindow = function(){
			if (that.windows.treeMapWindow == undefined || that.windows.treeMapWindow == null){
				that.windows.treeMapWindow = new BrowserWindow({width: 400, height:400});
				that.windows.treeMapWindow.loadURL('file://' + that.workingDir + '/public/treeMapWindow.html');
				that.windows.treeMapWindow.on('close', function(){
					that.windows.treeMapWindow = null;
				});
			}
		};

		that._createMainWindow = function(){
			if (that.windows.mainWindow == undefined || that.windows.mainWindow == null){
				that.windows.mainWindow = new BrowserWindow({width: 800, height:600});
				that.windows.mainWindow.webContents.openDevTools();
				that.windows.mainWindow.loadURL('file://' + that.workingDir + '/public/index.html');
				that.windows.mainWindow.on('close', function(){
					that.windows.mainWindow = null;
				});
			}
		};

		return that;
	}
};

module.exports = {
	MAIN_WINDOW: MAIN_WINDOW,
	ACTIVITY_LOG_WINDOW: ACTIVITY_LOG_WINDOW,
	TABLE_WINDOW: TABLE_WINDOW,
	TREE_MAP_WINDOW: TREE_MAP_WINDOW,
	WindowsManager: windowsManager
};
