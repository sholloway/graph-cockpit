/** @module menu/templates/helpMenu */

/** Template for the Help menu.
*/
const createMenu = function(){
	return {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://github.com/sholloway/graph-cockpit'); }
      }
    ]
  };
};

export default createMenu;
