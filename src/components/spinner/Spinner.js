/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Spinner.css';

class Spinner extends Component{
	constructor(props){
		super(props);
	}

	render(){
		let display = (this.props.spinning)? this.spin : this.idle;
		return display();
	}

	spin(){
		return (
			<div className="sh-spinner-container-active">
				<div className="sh-spinner-background"></div>
				<div className="sh-spinner">
					<div className="sh-dot1"></div>
					<div className="sh-dot2"></div>
				</div>
			</div>
		);
	}

	idle(){
		return (<div className="sh-spinner-container-idle"></div>);
	}
}
export default Spinner;
