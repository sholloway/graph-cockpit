/** @module menu/templates/viewMenu */

/** Template for the View menu.
*/
const createMenu = function(){
	return {
		label: "View",
		submenu: [
			{ label: 'Activity Log'},
			{ label: 'Table View'}
		]
	};
};

export default createMenu;
