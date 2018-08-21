/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Electron from 'electron';
const remote = Electron.remote;
const Menu = remote.Menu;

import createDefaultMenu from './templates/defaultMenu.js';

class CanvasContextMenu extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount (){
		let menuTemplate = createDefaultMenu(this.props.createItemHandler);
		this.generatedMenu = Menu.buildFromTemplate(menuTemplate);
	}

	//This component does not add anything to the DOM.
	render(){
		if(this.props.displayContextMenu){
			this.generatedMenu.popup({});
		}
		return false;
	}
}
CanvasContextMenu.propTypes = {
	launchFindElementGUI: PropTypes.func.isRequired
};

CanvasContextMenu.propTypes = {
	displayContextMenu: PropTypes.bool.isRequired,
	createItemHandler: PropTypes.func.isRequired
};

export default CanvasContextMenu;
