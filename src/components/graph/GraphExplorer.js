/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './GraphExplorer.css';
import Element, {ElementRenderStates} from './element/Element.js';

class GraphExplorer extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	/*
	SVG ViewBox Notes:
	https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions
	Width & Height are the size of the canvas. ViewBox is how much is visible.

	https://css-tricks.com/mega-list-svg-information/
	https://sarasoueidan.com/blog/svg-coordinate-systems/
	*/
	render(){
		let vb = "0 0 300 600";
		let nodes = this._buildNodes();
		return(
			<div className="graphExplorer">
				<p>Graph Explorer</p>
				<div className="graphExplorer-CanvasContainer">
					<svg preserveAspectRatio="none">
						{
							nodes.map(function(node){
								return <Element key = {node.data.id}
									x = {node.x} y = {node.y}
									renderState = {node.renderState}
									data = {node.data} />;
							})
						}
					</svg>
				</div>
			</div>
		);
	}

	_buildNodes(){
		let nodes = [];
		nodes.push({
			x: 100, y: 100,
			renderState: ElementRenderStates.IDLE,
			data: { id: 1}
		});

		nodes.push({
			x: 300, y: 300,
			renderState: ElementRenderStates.SELECTED,
			data: { id: 2}
		});

		nodes.push({
			x: 500, y: 500,
			renderState: ElementRenderStates.UPSTREAM,
			data: { id: 3}
		});
		return nodes;
	}
}
export default GraphExplorer;
