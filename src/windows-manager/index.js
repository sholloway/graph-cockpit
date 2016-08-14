const electron = require('electron');
const {BrowserWindow} = electron;
const shortid = require('shortid');

const MAIN_WINDOW = 'MAIN_WINDOW';
const ACTIVITY_LOG_WINDOW = 'ACTIVITY_LOG_WINDOW';
const TABLE_WINDOW = 'TABLE_WINDOW';
const TREE_MAP_WINDOW = 'TREE_MAP_WINDOW';

let windowsManager = {
	instance: function(){
		let that = {};
		that.windows = {
			activityWindow: null,
			tableWindows: {},
			treeMap: null,
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
					break;
				case MAIN_WINDOW:
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
				that.windows.activityWindow.loadURL('file://' + __dirname + '/pages/activityWindow.html');
				that.windows.activityWindow.on('close', function(){
					that.windows.activityWindow = null;
				});
			}
		};

		that._createTableWindow= function(){
			let windowContainer = {};
			windowContainer.windowId = shortid.generate();
			windowContainer.newTableWindow = new BrowserWindow({width: 600, height: 600});
			windowContainer.newTableWindow.loadURL('file://' + __dirname + '/pages/tableWindow.html');
			that.windows.tableWindows[windowContainer.windowId] = windowContainer;
			windowContainer.newTableWindow.on('close', (function(){
				if (that.windows.tableWindows && that.windows.tableWindows.hasOwnProperty(this.windowId)) {
					that.windows.tableWindows[this.windowId] = null;
					delete that.windows.tableWindows[this.windowId];
				}
			}).bind(windowContainer));
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
