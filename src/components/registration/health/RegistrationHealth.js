/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './RegistrationHealth.css';

export const HEALTH_RENDER_STATE = {
	INITIALIZE: 'reg-initial-ok',
	HEALTHY: 'reg-ok',
	NEW_ERROR: 'reg-new-error',
	ERROR: 'reg-existing-error',
	OK_TRANSITION: 'reg-re-establish-ok',
	LAUNCH: 'reg-registered'
};

class RegistrationHealth extends Component{
	constructor(props) {
    super(props);
	}

	/*
	Next Steps:
	I want a liquidy, electric effect for the health component.
	I like the idea of plasma flowing through a glass pipe.
	The effect should intensify when the app is launching.

	Possible Solutions
	- Gifs
	- CSS Animation
	- Canvas Animation

	Resources:
	- Glowing: http://codersblock.com/blog/creating-glow-effects-with-css/
	- Electic Canvas Demo: http://cssdeck.com/labs/xeheqrb1
	- Explaination of Plasma Algorithm: http://www.mennovanslooten.nl/blog/post/72
	*/
	render(){
		let cn = `registrationHealth ${this.props.renderState}`;
		return(
			<div className="registrationHealth-container">
				<div className={cn}></div>
			</div>
		);
	}
}
RegistrationHealth.propTypes = {
	renderState: PropTypes.string.isRequired
};

export default RegistrationHealth;
