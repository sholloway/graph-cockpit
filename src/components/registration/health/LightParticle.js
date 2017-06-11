/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './LightParticle.css';
// import {Motion, spring} from 'react-motion';

import MathHelper from '../../../helpers/MathHelper'

class LightParticle extends Component{
	constructor(props) {
    super(props);
		this.math = new MathHelper();
		this.state = {
      isResting: false,
			posX: this.math.random(0,100),
			posY: 0,
			width: this.math.random(2,15),
			height: this.math.random(10,400),
			speed: this.math.random(3,6),
			opacity: this._opacity(),
			color: this._color()
    }
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
		this._resetAnimation = this._resetAnimation.bind(this);
		this._selectStyle = this._selectStyle.bind(this);
		this._selectClass = this._selectClass.bind(this);
		this._opacity = this._opacity.bind(this);
		this._color = this._color.bind(this);
	}

	handleAnimationEnd(){
		this.setState({
      isResting: true,
			posX: this.math.random(0,100),
			width: this.math.random(5,15),
			height: this.math.random(10,75),
			speed: this.math.random(3,6)
    }, () => {
      requestAnimationFrame(() => {
        this.setState({
          isResting: false
        })
      })
    })
	}

	_resetAnimation(){
		// console.log("Animation Reset Was Called");
		this.setState({
      isResting: !this.state.isResting,
			posX: this.math.random(1,100),
			width: this.math.random(2,10),
			height: this.math.random(10,400),
			speed: this.math.random(3,20),
			opacity: this._opacity(),
			color: this._color()
    });
	}

	_opacity(){
		let o = Math.random(); //[0,1)
		let lower = Math.max(0.5, 0); //Clip at 0.2
		let upper = Math.min(0.95, lower); //Clip at 0.9
		return upper;
	}

	_selectStyle(){
		if (this.state.isResting){
			// console.log("alt");
			return {
				animation: `alt-fall 0.01s linear`
			};
		}else{
			// console.log("fall");
			return {
				animation: `fall ${this.state.speed}s linear`
			}
		}
	}

	_selectClass(){
		return (this.state.isResting)? 'resting' : "lightParticleGroup";
	}

	_color(){
		let commonColors = [
			'#3E333A', //??
			'#052399', //blue
			'#44F5F6', //light blue
			'#6B797C' //gray
		];

		let rareColors = [
			"#F31155", //Neon pink
			"#8C1D7E" // Purple
		]

		//Select a common color or rare color.
		//rare should be 1 out of 20.
		let chance = this.math.random(1,20)
		let color;
		if (chance == 1){ //If we got 1...
			let rareIndex = this.math.random(0, rareColors.length - 1);
			color = rareColors[rareIndex];
		}else{
			let commonIndex = this.math.random(0, commonColors.length - 1);
			color = commonColors[commonIndex];
		}
		return color;
	}

	render(){
		// console.log("Render");
		return(
			<g className={this._selectClass()}
				style={this._selectStyle()}
				onAnimationEnd={this._resetAnimation}
			>
				<rect className="lightParticle"
					x={this.state.posX} y="0"
					width={this.state.width} height={this.state.height}
					rx="2" ry="2"
					opacity={this.state.opacity}
					fill={this.state.color}
				/>
			</g>
		);
	}
}

LightParticle.propTypes = {
};

export default LightParticle;
