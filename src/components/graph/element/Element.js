/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './Element.css';
import ElementContextMenu from './ElementContextMenu';

export const ElementRenderStates = {
	IDLE: "elementIdle",
	SELECTED: "elementSelected",
	UPSTREAM: "elementUpstream",
	DOWNSTREAM: "elementDownstream"
};

class Element extends Component{
	constructor(props) {
    super(props);
		this._onClick = this._onClick.bind(this);
		this._onRightClick = this._onRightClick.bind(this);
	}

	componentWillMount (){
	}

	render(){
		return(
			<g>
				<ElementContextMenu
					displayContextMenu={this.props.displayContextMenu}
					deleteSelectedItem={this.props.deleteSelectedItem}/>
				<rect className={this.props.renderState}
					x={this.props.x} y={this.props.y}
					width="100" height="100"
					onClick={this._onClick}
					onContextMenu={this._onRightClick}/>
			</g>
		);
	}

	_onClick(event){
		this.props.handleOnClick(this.props.data.id);
	}

	_onRightClick(event){
		if (this.props.renderState == ElementRenderStates.SELECTED){
			this.props.handleOnRightClick(this.props.data.id);
		}
	}
}

Element.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	renderState: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	handleOnClick: PropTypes.func.isRequired,
	displayContextMenu: PropTypes.bool.isRequired,
	handleOnRightClick: PropTypes.func.isRequired,
	deleteSelectedItem: PropTypes.func.isRequired
};

export default Element;
