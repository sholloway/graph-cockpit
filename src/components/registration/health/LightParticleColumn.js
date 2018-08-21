/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import LightParticleLayer from './LightParticleLayer.js';
import './LightParticleColumn.css';

export const HEALTH_RENDER_STATE = {
	INITIALIZE: 'reg-initial-ok',
	HEALTHY: 'reg-ok',
	NEW_ERROR: 'reg-new-error',
	ERROR: 'reg-existing-error',
	OK_TRANSITION: 'reg-re-establish-ok',
	LAUNCH: 'reg-registered'
};

class LightParticleColumn extends Component{
	constructor(props) {
    super(props);
	}

	/*

	*/
	render(){
		let cn = `registrationHealth ${this.props.renderState}`;
		return(
			<div className="registrationHealth-container">
			  {/*<div className={cn}></div>*/}
				<LightParticleLayer />
			</div>
		);
	}
}

LightParticleColumn.propTypes = {
	renderState: PropTypes.string.isRequired
};

export default LightParticleColumn;
