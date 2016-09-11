/** @module graph/element/templates/defaultMenu */

/** Template for the Default context menu.
@param {function} deleteItem: Deletes the selected item.
*/
const createMenu = function(deleteItem){
	return [
		{
			label: 'Associate To',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Associate To");
			}
		},
		{ type: 'separator'},
		{
			label: 'Copy',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Copy");
			}
		},
		{
			label: 'Paste Hierarchy',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Paste Hierarchy");
			}
		},
		{
			label: 'Delete',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Delete");
				console.log(event);
				deleteItem();
			}
		},
		{
			label: 'Favorite',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Favorite");
			}
		},
		{
			label: 'Favorite',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Favorite");
			}
		},
		{ type: 'separator'},
		{
			label: 'Find Associated...',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Find Associated...");
			}
		},
		{
			label: 'Explore History...',
			// accelerator: 'CmdOrCtrl+F',
			click(menuItem, focusedWindow, event){
				console.log("Explore History...");
			}
		}
	];
};

export default createMenu;
