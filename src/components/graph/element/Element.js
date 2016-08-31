/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './Element.css';

export const ElementRenderStates = {
	IDLE: "elementIdle",
	SELECTED: "elementSelected",
	UPSTREAM: "elementUpstream",
	DOWNSTREAM: "elementDownstream"
};

class Element extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<rect className={this.props.renderState}
				x={this.props.x} y={this.props.y}
				width="100" height="100" />
		);
	}
}

Element.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	renderState: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired
};

export default Element;
