/** @module menu/templates/helpMenu */

/** Template for the Help menu.
*/
const createMenu = function(){
	return {
    role: 'window',
		submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  };
};

export default createMenu;
