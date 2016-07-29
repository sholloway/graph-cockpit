/** @module menu/templates/fileMenu */

/** Template for the File menu.
*/
const createMenu = function(){
	return {
		label: "File",
		submenu: [
			{
				label: 'New',
				submenu: [
					{ label: 'Dataset...'},
					{ label: 'Element Definition...'}
				]
			},
			{ label: 'Open...'},
			{ type: 'separator'},
			{ label: 'Close'},
			{ label: 'Save'},
			{ label: 'Rename'},
			{ label: 'Duplicate'},
			{ label: 'Snapshot'},
			{ label: 'Revert To...'},
			{ type: 'separator'},
			{ label: 'Export...'},
			{ label: 'Backup...'},
			{ type: 'separator'},
			{ label: 'Print'}
		]
	};
};

export default createMenu;
