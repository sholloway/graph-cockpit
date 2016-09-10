/** @module graph/canvas/templates/defaultMenu */

/** Template for the Default context menu.
Create Element
Create Element Definition
Create Note
Create Video
Create Web
----------------------------------
Paste (Copied Element)
Paste Hierarchy
----------------------------------
Find...
*/
const createMenu = function(){
	return [
			{
				label: 'Create Element',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Create Element");
					}
				}
			},
			{
				label: 'Create Element Definition',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Create Element Definition");
					}
				}
			},
			{
				label: 'Create Note',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Create Note");
					}
				}
			},
			{
				label: 'Create Video Element',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Create Video Element");
					}
				}
			},
			{
				label: 'Create Web Element',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Create Web Element");
					}
				}
			},
			{ type: 'separator'},
			{
				label: 'Paste (Copied Element)',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Paste Copied Element");
					}
				}
			},
			{
				label: 'Paste Hierarchy',
				// accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						console.log("Paste Hierarchy");
					}
				}
			},
			{ type: 'separator'},
			{ label: 'Find...'}
		];
};
export default createMenu;
