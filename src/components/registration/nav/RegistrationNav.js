/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './RegistrationNav.css';

class UserRegistration extends Component{
	constructor(props) {
    super(props);
	}

	render(){
		return(
			<div className="registrationNav sh-row">
				<button className="registrationBackButton sh-button sh-clickable"
					onClick={this.props.navBack}>Back</button>
				<button className="registrationNextButton sh-button sh-clickable"
						onClick={this.props.navForward}>Next</button>
			</div>
		);
	}
}
UserRegistration.propTypes = {
	navBack: PropTypes.func.isRequired,
	navForward: PropTypes.func.isRequired
};

export default UserRegistration;
