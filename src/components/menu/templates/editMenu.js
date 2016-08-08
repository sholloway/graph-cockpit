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
						/*
						Goals: When the user clicks the menu item:
						1. The main window should become the focus window.
						2. The find bar should become visible if it's not already.
						3. The search text box should become the focused control.

						Attempt:
						Use the Router and Redux flow.
						Menu Item -> Action (FIND_ELEMENT_GUI_REQUESTED)
											-> Update State (Reducers)
											-> Main Window Gets Notified to Open Find

						How does the Menu Item get access to Action? It needs to be
						the same one mounted on the store and component.
						- Expose it on the focusedWindow?
						*/
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
