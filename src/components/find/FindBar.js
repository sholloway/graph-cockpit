/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './FindBar.css';

class FindBar extends Component{
	constructor(props) {
    super(props);
		this.handleKeyPressed = this.handleKeyPressed.bind(this);
	}

	componentWillMount (){
	}

	componentDidMount(){
		window.addEventListener('keydown', this.handleKeyPressed);
	}

	componentWillUnmount(){
		window.removeEventListener('keydown', this.handleKeyPressed);
	}

	handleKeyPressed(event){
		switch(event.key){
			case 'Escape':
				this.props.escWasPressed();
				break;
			default:
				break;
		}
	}

	render(){
		let toRender = (this.props.displayed)? this.activeBar : this.inactiveBar;
		return toRender();
	}

	activeBar(){
		return (
			<div className="findBar">
				<p>Find Bar</p>
			</div>
		);
	}

	inactiveBar(){
		return false;
	}
}
FindBar.propTypes = {
	displayed: PropTypes.bool.isRequired,
	escWasPressed: PropTypes.func.isRequired
};

export default FindBar;
