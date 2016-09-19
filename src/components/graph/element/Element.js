/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './Element.css';
import ElementContextMenu from './ElementContextMenu';
import {ElementRenderStates} from '../../../constants/elementRenderStates';

class Element extends Component{
	constructor(props) {
    super(props);
		this._onClick = this._onClick.bind(this);
		this._onRightClick = this._onRightClick.bind(this);
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseDown = this._onMouseDown.bind(this);
		this._onMouseUp = this._onMouseUp.bind(this);
		this._onMouseMove = this._onMouseMove.bind(this);
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
					transform="matrix(1 0 0 1 0 0)"
					onClick={this._onClick}
					onMouseDown={this._onMouseDown}
					onMouseUp={this._onMouseUp}
					onMouseMove={this._onMouseMove}
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

	_onMouseDown(event){
		this.props.dragStart(this.props.data.id, this.props.renderState, event);
	}

	_onMouseUp(event){
		this.props.dragEnd();
	}

	_onMouseMove(event){
		this.props.drag(this.props.data.id, this.props.renderState, event);
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
	deleteSelectedItem: PropTypes.func.isRequired,
	moving: PropTypes.bool.isRequired,
	dragStart: PropTypes.func.isRequired,
	drag: PropTypes.func.isRequired,
	dragEnd: PropTypes.func.isRequired
};

export default Element;
