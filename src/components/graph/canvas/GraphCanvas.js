/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './GraphCanvas.css';

class GraphCanvas extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<g className="graphBackgroundGroup">
				<rect className="graphBackgroundRect"
					x={this.props.minX}
					y={this.props.minY}
					width={this.props.width}
					height={this.props.height}
					onClick={this.props.handleMouseClick}/>
			</g>
		);
	}
}

GraphCanvas.propTypes = {
	minX: PropTypes.number.isRequired,
	minY: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	handleMouseClick: PropTypes.func.isRequired
};

export default GraphCanvas;
