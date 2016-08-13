const electron = require('electron');
const {BrowserWindow} = electron;
const MAIN_WINDOW = 'MAIN_WINDOW';
const ACTIVITY_LOG_WINDOW = 'ACTIVITY_LOG_WINDOW';
const TABLE_WINDOW = 'TABLE_WINDOW';
const TREE_MAP_WINDOW = 'TREE_MAP_WINDOW';

let windowsManager = {
	instance: function(){
		let that = {};
		that.windows = {
			activityWindow: null,
			tableWindows: [],
			treeMap: null,
			mainWindow: null
		};

		that.createWindow = function(type){
			switch(type){
				case ACTIVITY_LOG_WINDOW:
					that._createActivityWindow();
					break;
				case TABLE_WINDOW:
					break;
				case TREE_MAP_WINDOW:
					break;
				case MAIN_WINDOW:
					break;
				default:
					//TODO Need a logging solution.
					console.log("Unknow window type");
			}
		};

		that.destroyWindow = function(){};
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
