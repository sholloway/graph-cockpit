/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Electron from 'electron';
const remote = Electron.remote;
const Menu = remote.Menu;

import createAppMenu from './templates/appMenu.js';
import createFileMenu from './templates/fileMenu.js';
import createEditMenu from './templates/editMenu.js';
import createViewMenu from './templates/viewMenu.js';
import createWindowsMenu from './templates/windowsMenu.js';
import createHelpMenu from './templates/helpMenu.js';

class ApplicationMenu extends Component{
	constructor(props) {
		super(props);
	}

	componentWillMount (){
		const menuTemplate = [];
		const platform = remote.getGlobal("appEnv").platform;
		if (platform === 'darwin') {
			const appName = remote.app.getName();
			const appMenu = createAppMenu(appName);
			menuTemplate.push(appMenu);
		}
		menuTemplate.push(createFileMenu());
		menuTemplate.push(createEditMenu(this.props.launchFindElementGUI));
		menuTemplate.push(createViewMenu());
		menuTemplate.push(createWindowsMenu());
		menuTemplate.push(createHelpMenu());
		const generatedMenu = Menu.buildFromTemplate(menuTemplate);
		Menu.setApplicationMenu(generatedMenu);
	}

	//This component does not add anything to the DOM.
	render(){
		return false;
	}
}
ApplicationMenu.propTypes = {
	launchFindElementGUI: PropTypes.func.isRequired
};

export default ApplicationMenu;
