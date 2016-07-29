/** @module menu/templates/editMenu */

/** Template for the Edit menu.
*/
const createMenu = function(){
	return {
		label: "Edit",
		submenu: [
			{ label: 'Element Definition...'},
			{ type: 'separator'},
			{ label: 'Find Element...'},
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
