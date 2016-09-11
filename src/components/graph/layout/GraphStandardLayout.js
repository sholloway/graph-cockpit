/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './GraphStandardLayout.css';
import Element, {ElementRenderStates} from '../element/Element.js';

class GraphStandardLayout extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		let vb = this._buildViewBox();
		return(
			<svg className="graphExplorerCanvas"
				ref={(ref) => this.graphExplorerCanvas = ref}
				preserveAspectRatio="none"
				width="100%"
				height="100%"
				viewBox={vb}>
				<g className="graphDataset">
				{
					this.props.dataset.map((node) => {
						return <Element key = {node.data.id}
							x = {node.x} y = {node.y}
							renderState = {node.renderState}
							data = {node.data}
							handleOnClick={this.props.handleElementOnClick}
							displayContextMenu={node.displayContextMenu}
							handleOnRightClick={this.props.handleElementOnRightClick}
							deleteSelectedItem={this.props.deleteSelectedItem} />;
					})
				}
				</g>
			</svg>
		);
	}

	_buildViewBox(){
		let vb = `${this.props.minX} ${this.props.minY} ${this.props.width} ${this.props.height}`;
		return vb;
	}
}

GraphStandardLayout.propTypes = {
	minX: PropTypes.number.isRequired,
	minY: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	dataset: PropTypes.arrayOf(React.PropTypes.object).isRequired,
	handleElementOnClick: PropTypes.func.isRequired,
	handleElementOnRightClick: PropTypes.func.isRequired,
	deleteSelectedItem: PropTypes.func.isRequired
};

export default GraphStandardLayout;
