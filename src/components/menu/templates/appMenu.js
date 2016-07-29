/** @module menu/templates/appMenu */

/** Template for the OS X Application menu.
	@param {string} appName - The application name.
*/
const createMenu = function(appName){
	return {
		label: appName,
		submenu: [
			{ role: 'about' },
			{ type: 'separator'},
			{ label: 'Preferences' }, //TODO How are application preferences configured?
			{ type: 'separator' },
			{
				role: 'services',
				submenu: [] //TODO Does this application have any services integration?
			},
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideothers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit'}
		]
	};
};

export default createMenu;
