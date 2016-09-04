/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './GraphHud.css';

class GraphHud extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		let vb = this._buildViewBox();
		return(
			<svg className="graphExplorerHUD"
				ref={(ref) => this.hud = ref}
				preserveAspectRatio="none"
				width="100%"
				height="100%"
				viewBox={vb}>
				<g>
					<rect className="hudZoomIn"
						x="20" y="20"
						width="40" height="40" onClick={this.props.handleZoomInClick}/>
					<rect className="hudZoomOut"
						x="20" y="70"
						width="40" height="40" onClick={this.props.handleZoomOutClick}/>
					<rect className="hudZoomReset"
						x="20" y="120"
						width="40" height="40" onClick={this.props.handleZoomResetClicked}/>
				</g>
			</svg>
		);
	}

	_buildViewBox(){
		let vb = `${this.props.minX} ${this.props.minY} ${this.props.width} ${this.props.height}`;
		return vb;
	}
}

GraphHud.propTypes = {
	minX: PropTypes.number.isRequired,
	minY: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	handleZoomInClick: PropTypes.func.isRequired,
	handleZoomOutClick: PropTypes.func.isRequired,
	handleZoomResetClicked: PropTypes.func.isRequired
};

export default GraphHud;
