/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Electron from 'electron';
const remote = Electron.remote;
const Menu = remote.Menu;

import createDefaultMenu from './templates/defaultMenu.js';

class ElementContextMenu extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount (){
		let menuTemplate = createDefaultMenu();
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
	displayContextMenu: PropTypes.bool.isRequired
};

export default ElementContextMenu;
