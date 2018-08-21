/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {remote} from 'electron';

var Menu;
if(remote){
	//In the rendering process and not running in a test.
	//Need a way to rewire the imports, but so far all attempts to rewire
	//a module has been complicated due to the combination of babel and webpack.
	Menu = remote.Menu;
}

import createDefaultMenu from './templates/defaultMenu.js';

class ElementContextMenu extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount (){
		let menuTemplate = createDefaultMenu(this.props.deleteSelectedItem);
		this.generatedMenu = Menu.buildFromTemplate(menuTemplate);
	}

	//This component does not add anything to the DOM.
	render(){
		if(this.props.displayContextMenu){
			this.generatedMenu.popup();
		}
		return false;
	}
}

ElementContextMenu.propTypes = {
	displayContextMenu: PropTypes.bool.isRequired,
	deleteSelectedItem: PropTypes.func.isRequired
};

export default ElementContextMenu;
