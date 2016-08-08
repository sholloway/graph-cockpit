/** @module menu/templates/editMenu */

/** Template for the Edit menu.
*/
const createMenu = function(launchFindElementGUI){
	return {
		label: "Edit",
		submenu: [
			{ label: 'Element Definition...'},
			{ type: 'separator'},
			{
				label: 'Find Element...',
				accelerator: 'CmdOrCtrl+F',
				click(menuItem, focusedWindow, event){
					if(focusedWindow){
						launchFindElementGUI();
					}
				}
			},
			{ label: 'Find Association...'},
			{
				label: 'Dataset',
				submenu: [
					{ label: 'Share...'},
					{ label: 'Delete'},
					{ label: 'Update...'}
				]
			}
		]
	};
};
export default createMenu;
