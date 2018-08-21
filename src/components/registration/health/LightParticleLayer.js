/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './LightParticleLayer.css';

import LightParticle from './LightParticle.js';
import MathHelper from '../../../helpers/MathHelper'

class LightParticleLayer extends Component{
	constructor(props) {
    super(props);
		this.math = new MathHelper();
		this.particles = this.math.range(1,200);
	}

	render(){
		return(
			<div className="lightParticleLayer-container">
				<svg className="lightParticleLayer">
					{
						this.particles.map((count) =>
							<LightParticle key={count.toString()}/>
						)
					}
				</svg>
			</div>
		);
	}
}

LightParticleLayer.propTypes = {
	renderState: PropTypes.string.isRequired
};

export default LightParticleLayer;
