/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes  } from 'react';
import ReactDOM from 'react-dom';
import './FindBar.css';

class FindBar extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
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
	displayed: PropTypes.bool.isRequired
};

export default FindBar;
