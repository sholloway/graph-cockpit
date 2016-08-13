/** @module menu/templates/viewMenu */
import Electron from 'electron';
const remote = Electron.remote;
const {ipcRenderer} = require('electron');
import {ACTIVITY_LOG_WINDOW, TABLE_WINDOW, TREE_MAP_WINDOW} from '../../../windows-manager';

/** Template for the View menu.
*/
const createMenu = function(){
	return {
		label: "View",
		submenu: [
			{ label: 'Activity Log',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						ipcRenderer.send('launch-window', ACTIVITY_LOG_WINDOW);
					}
				}
			},
			{ label: 'Table View',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						ipcRenderer.send('launch-window', TABLE_WINDOW);
					}
				}
			},
			{ label: 'Table Map',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						ipcRenderer.send('launch-window', TREE_MAP_WINDOW);
					}
				}
			}
		]
	};
};
export default createMenu;
/*
Next Steps:
Stub out Activity Log
Stub out Table View
*/
