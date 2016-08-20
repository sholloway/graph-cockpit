/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {PHASE_TYPES, STATUS_TYPES} from '../../../constants/registrationTypes';
import './RegistrationPrompt.css';

class RegistrationPrompt extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		let prompt = this._selectPrompt(this.props.phase);
		return(
			<div className="registrationPrompt sh-row">
				{prompt}
			</div>
		);
	}

	validate(phase){
		let valid;
		switch(phase){
			case PHASE_TYPES.INTRODUCTION:
				valid = true; //Nothing to validate.
				break;
			case PHASE_TYPES.NICKNAME_PROMPT:
				valid = this._validateName();
				break;
			case PHASE_TYPES.PASSWORD_PROMPT:
				valid = this._validatePassword();
				break;
			case PHASE_TYPES.EMAIL_PROMPT:
				valid = this._validateEmail();
				break;
			case PHASE_TYPES.EMAIL_VERIFICATION:
				valid = this._validateCode();
				break;
			default:
				valid = false;
		}
		return valid;
	}

	/*Connot be empty*/
	_validateName(){
		return this.nicknameTextBox.value.trim().length > 0;
	}

	/*
	^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$
	^                  // the start of the string
	(?=.*[a-z])        // One lower case letter exists
	(?=.*[A-Z])        // One upper case letter exists
	(?=.*\d)           // One digit exists
	(?=.*[_\W])        // One underscore or non-word character exists
	.+                 // gobble up the entire string
	$                  // the end of the string
	*/
	_validatePassword(){
		let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/;
		let pwd = this.passwordTextBox.value.trim(); //Don't allow spaces on the ends.
		let patternMatch = pwd.match(pattern);
		return (pwd.length >= 8 && patternMatch != null);
	}

	_validateEmail(){
		let pattern = /^[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z_+])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/;
		let email = this.emailTextBox.value.trim();
		let patternMatch = email.match(pattern);
		return (patternMatch != null);
	}

	_validateCode(){
		//TODO Call the engine to verify this. Don't do this in Javascript.
		let email = this.verificationTextBox.value.trim();
		return (email.length > 0);
	}

	_selectPrompt(phase){
		let prompt;
		switch(phase){
			case PHASE_TYPES.INTRODUCTION:
				prompt = this._registrationPrompt();
				break;
			case PHASE_TYPES.NICKNAME_PROMPT:
				prompt = this._nicknamePrompt();
				break;
			case PHASE_TYPES.PASSWORD_PROMPT:
				prompt = this._passwordPrompt();
				break;
			case PHASE_TYPES.EMAIL_PROMPT:
				prompt = this._emailPrompt();
				break;
			case PHASE_TYPES.EMAIL_VERIFICATION:
				prompt = this._emailVerification();
				break;
			default:
				prompt = 'Invalid State';
		}
		return prompt;
	}

	_registrationPrompt(){
		return (
			<span>
			</span>
		);
	}

	_nicknamePrompt(){
		return (
			<span>
				<label htmlFor="nickname-txt-field">Name</label>
				<input type="text" className="form-control"
					id="nickname-txt-field"
					ref={(ref) => this.nicknameTextBox = ref}
					value={this.props.nickname}
					onChange={this.props.handleNicknameChange}
					autoFocus
					required/>
			</span>
		);
	}

	_passwordPrompt(){
		return (
			<span>
				<label htmlFor="pwd-txt-field">Password</label>
				<input type="text" className="form-control"
					id="pwd-txt-field"
					ref={(ref) => this.passwordTextBox = ref}
					value={this.props.password}
					onChange={this.props.handlePasswordChange}
					autoFocus
					required/>
			</span>
		);
	}

	_emailPrompt(){
		return (
			<span>
				<label htmlFor="email-txt-field">Email</label>
				<input type="text" className="form-control"
					id="email-txt-field"
					ref={(ref) => this.emailTextBox = ref}
					value={this.props.emailAddress}
					onChange={this.props.handleEmailChange}
					autoFocus
					required/>
			</span>
		);
	}

	_emailVerification(){
		return (
			<span>
				<label htmlFor="verify-txt-field">Verification Code</label>
				<input type="text" className="form-control"
					id="verify-txt-field"
					ref={(ref) => this.verificationTextBox = ref}
					value={this.props.verificationCode}
					onChange={this.props.handleCodeChange}
					autoFocus
					required/>
			</span>
		);
	}
}
RegistrationPrompt.propTypes = {
	nickname: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	emailAddress: PropTypes.string.isRequired,
	verificationCode: PropTypes.string.isRequired,
	handleNicknameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleEmailChange: PropTypes.func.isRequired,
	handleCodeChange: PropTypes.func.isRequired
};

export default RegistrationPrompt;
