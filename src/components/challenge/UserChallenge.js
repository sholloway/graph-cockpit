/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './UserChallenge.css';
import Spinner from '../spinner/Spinner';

const TEXT_INPUT_TYPE = "text";
const PASSWORD_INPUT_TYPE = "password";
const USER_INPUT_INITIAL_STATE = 0;
const USER_INPUT_VALID = 1;
const USER_NAME_EMPTY = -1;
const PASSWORD_EMPTY = -2;
const AUTHENTICATION_FAILED = -3;

const AUTH_FAILED_MSG = "Failed to authenticate.";
const PASSWORD_PROMPT_MSG = "Please provide your password.";
const USER_NAME_PROMPT_MSG = "Please provide your username.";
const DUAL_INPUT_PROMPT_MSG = "Please provide your username and password.";
const ATTEMPTING_LOGIN_MSG = "Attempting Login";

class UserChallenge extends Component{
	constructor(props) {
    super(props);

		this.login = this.login.bind(this);
		this.state = {
			passwordBoxType: PASSWORD_INPUT_TYPE,
			inputStatus: USER_INPUT_INITIAL_STATE
		};
	}

	componentWillMount (){
	}

	componentWillUpdate(nextProps, nextState){ /* eslint-disable-line no-unused-vars */
		if(nextProps.authenticated){
			this.props.router.push('/home');
		}
	}

	render(){
		const {displayPasswordOptionChanged} = this.props;
		let passwordBoxType = (this.props.dispayPassword)? TEXT_INPUT_TYPE : PASSWORD_INPUT_TYPE;
		return(
			<div className="userChallenge sh-column">
				<div className="sh-row">
					<span className="sh-status-message">{this.statusMessage()}</span>
				</div>
				<div className="sh-row">
					<label htmlFor="user-name-txt-field">User Name</label>
					<input type="text" className="form-control"
						id="user-name-txt-field"
						ref={(ref) => this.userNameTextBox = ref}
						placeholder="user@email.com"
						autoFocus
						required/>
				</div>
				<div className="sh-row">
					<label htmlFor="user-last-name-txt-field">Password</label>
					<input type={passwordBoxType}
						className="form-control"
						id="user-password-txt-field"
						ref={(ref) => this.passwordBox = ref}
						placeholder="nice complicated password"
						required/>
				</div>
				<div className="sh-row">
					<label>
						<input ref="coreTeamMember"
							type="checkbox"
							onClick={displayPasswordOptionChanged} /> Show Password
					</label>
					<button className="sh-button sh-clickable"
						onClick={this.login}>login</button>
				</div>
				<div className="sh-centered-row">
					<a href={this.login}>reset password</a>
					<a href={this.login}>register new user</a>
				</div>
				<Spinner spinning={this.props.authenticating}/>
			</div>
		);
	}

	/*
	Can you make a function private in an ES6 class?
	*/
	login(){
		let userInput = this.fetchUserInput();
		let status = this.validateUserInput(userInput);
		if (status == USER_INPUT_VALID){
			this.props.authenticationRequest(userInput);
		}else{
			//TODO: Change to use an action...
			let mutatedState = this.state;
			mutatedState.inputStatus = status;
			this.setState(mutatedState);
		}
	}

	fetchUserInput(){
		let userInput = {};
		userInput.username = this.userNameTextBox.value;
		//TODO Generate a hash. Don't pass this around in memory.
		userInput.password = this.passwordBox.value;
		return userInput;
	}

	validateUserInput(userInput){
		let userStatus;
		if (userInput.username.trim().length < 1){
			userStatus = USER_NAME_EMPTY;
		}else if(userInput.password.trim().length < 1){
			userStatus = PASSWORD_EMPTY;
		}else{
			userStatus = USER_INPUT_VALID;
		}
		return userStatus;
	}

	statusMessage(){
		let statusMessage;
		switch(this.state.inputStatus){
			case AUTHENTICATION_FAILED:
				statusMessage = AUTH_FAILED_MSG;
				break;
			case PASSWORD_EMPTY:
				statusMessage = PASSWORD_PROMPT_MSG;
				break;
			case USER_NAME_EMPTY:
				statusMessage = USER_NAME_PROMPT_MSG;
				break;
			case USER_INPUT_INITIAL_STATE:
				statusMessage = DUAL_INPUT_PROMPT_MSG;
				break;
			case USER_INPUT_VALID:
				statusMessage = ATTEMPTING_LOGIN_MSG;
				break;
			default:
				statusMessage = DUAL_INPUT_PROMPT_MSG;
		}
		return statusMessage;
	}
}
UserChallenge.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	authenticating: PropTypes.bool.isRequired,
	dispayPassword: PropTypes.bool.isRequired,
	displayPasswordOptionChanged: PropTypes.func.isRequired,
	authenticationRequest: PropTypes.func.isRequired
};
export default UserChallenge;
