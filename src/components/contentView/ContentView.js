/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ContentView.css';

class ContentView extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div>
				<p>Content View</p>
			</div>
		);
	}
}

export default ContentView;
