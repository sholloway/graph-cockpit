/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './StatusBar.css';

class StatusBar extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div>
				<p>Status Bar</p>
			</div>
		);
	}
}

export default StatusBar;
