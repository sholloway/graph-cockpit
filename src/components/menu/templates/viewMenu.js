/** @module menu/templates/viewMenu */
import Electron from 'electron';
const remote = Electron.remote;
const {ipcRenderer} = require('electron');

/** Template for the View menu.
*/
const createMenu = function(){
	return {
		label: "View",
		submenu: [
			{ label: 'Activity Log',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						launchActivityLogWindow();
					}
				}
			},
			{ label: 'Table View',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						launchTableViewWindow();
					}
				}
			},
			{ label: 'Table Map',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						launchTableMapWindow();
					}
				}
			}
		]
	};
};

function launchActivityLogWindow(){
	ipcRenderer.send('launch-window');
}

function launchTableViewWindow(){
	console.log('Hi Table View');
}

function launchTableMapWindow(){
	console.log('Hi Table Map');
}

export default createMenu;
/*
Next Steps:
Stub out Activity Log
Stub out Table View
*/
