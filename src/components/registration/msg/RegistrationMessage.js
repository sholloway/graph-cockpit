/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {PHASE_TYPES, STATUS_TYPES} from '../../../constants/registrationTypes';
import './RegistrationMessage.css';

const REGISTATION_PWD_INSTRUCTIONS_MSG = ``;

class RegistrationMessage extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount(){
	}

	render(){
		let msg = this._selectMessage(this.props.phase,
			this.props.status,
			this.props.nickname,
			this.props.emailAddress);
		return(
			<div className="registrationMessage">
				{msg}
			</div>
		);
	}

	_selectMessage(phase, status, nickname, emailAddress){
		let msg;
		switch(phase){
			case PHASE_TYPES.INTRODUCTION:
				msg = this._registrationMsg('Name It...');
				break;
			case PHASE_TYPES.NICKNAME_PROMPT:
				msg = this._nicknamePromptMsg(status);
				break;
			case PHASE_TYPES.PASSWORD_PROMPT:
				msg = this._passwordPromptMsg(status, nickname);
				break;
			case PHASE_TYPES.EMAIL_PROMPT:
				msg = this._emailPromptMsg(status);
				break;
			case PHASE_TYPES.EMAIL_VERIFICATION:
				msg = this._emailVerificationMsg(status, nickname, emailAddress);
				break;
			default:
				msg = 'Invalid State';
		}
		return msg;
	}

	/*
	Naming Ideas:
	Split the name into A.B like ell.ie for the url. Then on the app display it
	like Ell-ie. Find something that works with .io. To do this, perhaps there is
	a database of names that I can use. Then with the names, reverse the order of
	the strings to find names of the form oi...
	*/
	_registrationMsg(softwareName){
		return (
			<span>
				<h2>Welcome</h2>
				<p>Hi. I am <strong>{softwareName}</strong>.</p>
				<p>My mission in life is to help you organize all the different
					observations you make in life. </p>
				<p>I'd like to show you around real quick but
					before we can begin we need to set you up with a local account.</p>
				<h3>Note</h3>
				<p>This account is local to your computer only. If you install me on
					another computer you will have a different account for that machine.</p>
			</span>
		);
	}

	_nicknamePromptMsg(status){
		return (STATUS_TYPES.OK === status)? this._nicknameOKMsg() : this._nicknameErrorMsg();
	}

	_nicknameOKMsg(){
		return (
			<span>
				<h2>Welcome</h2>
				<p>What would you like me to call you? It can be anything you want and you can change it later.</p>
			</span>
		);
	}

	_nicknameErrorMsg(){
		return (
			<span>
				<h2>Welcome</h2>
				<p>Come on, I told you my name. Give me something to call you.</p>
			</span>
		);
	}

	_passwordPromptMsg(status, nickname){
		return (STATUS_TYPES.OK === status)? this._pwdOKMsg(nickname) : this._pwdErrorMsg(nickname);
	}

	_pwdOKMsg(nickname){
		return (
			<span >
				<h2>Password Setup</h2>
				<p>Nice to meet you <strong>{nickname}</strong>.</p>
				<p>The folks that made me believe that data is valuable. They told me to help you safe guard your data. To do that you need a password.</p>
				<p>I recommend using a password manager like A or B to generate and store a long randomly generated password. The important thing is to make it hard for another person or machine to guess what it is.</p>
			</span>
		);
	}

	_pwdErrorMsg(nickname){
		return (
			<span >
				<p>I'm sorry <strong>{nickname}</strong>.</p>
				<p>
					That password would be too easy to guess. You need to provide one that is:
				</p>
				<ol>
					<li>Longer than 8 characters.</li>
					<li>Contains both upper and lowercase characters.</li>
					<li>Contains at least one number.</li>
					<li>Contains a special character like !,@,#,$,%,^,&.</li>
				</ol>
			</span>
		);
	}

	_emailPromptMsg(status){
		return (STATUS_TYPES.OK === status)? this._emailOKMsg() : this._emailErrorMsg();
	}

	_emailOKMsg(){
		return (
			<span>
				<h2>Email Setup</h2>
				<p>All right, almost done. The last thing I need is a valid email address.</p>
				<p>Don't worry, I won't sell your email or spam you. I just need your email incase you forget your password.</p>
			</span>
		);
	}

	_emailErrorMsg(){
		return (
			<span>
				<h2>Email Setup</h2>
				<p>That isn't a correctly formatted email address. Why don't you give it another try.</p>
			</span>
		);
	}

	_emailVerificationMsg(status, nickname, emailAddress){
		return (STATUS_TYPES.OK === status)? this._verifyOKMsg(nickname, emailAddress) : this._verifyErrorMsg();
	}

	_verifyOKMsg(nickname, emailAddress){
		return (
			<span>
				<h2>Email Setup</h2>
				<p>Thank you <strong>{nickname}</strong>.</p>
				<p>I've sent you a verification code to {emailAddress} to verify
					I've	got the correct address. All you've got to do now is
					copy the code into the box below and we can get started.</p>
			</span>
		);
	}

	_verifyErrorMsg(){
		return (
			<span>
				<h2>Email Setup</h2>
				<p>That's not the code I sent you.</p>
				<p>Why don't you try again or if you need me to I can send you a different code.</p>
			</span>
		);
	}
}
RegistrationMessage.propTypes = {
	phase: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	nickname: PropTypes.string,
	emailAddress: PropTypes.string
};
export default RegistrationMessage;
