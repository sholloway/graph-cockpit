/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './GraphExplorer.css';

class GraphExplorer extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div className="graphExplorer">
				<p>Graph Explorer</p>
			</div>
		);
	}
}

export default GraphExplorer;
