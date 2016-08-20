/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegistrationHealth from '../components/registration/health/RegistrationHealth';
import RegistrationMessage from '../components/registration/msg/RegistrationMessage';
import RegistrationPrompt from '../components/registration/prompt/RegistrationPrompt';
import RegistrationNav from '../components/registration/nav/RegistrationNav';
import * as RegistrationActions from '../actions/registration';
import {PHASE_TYPES, STATUS_TYPES, minimumPhase, maximumPhase} from '../constants/registrationTypes';
import './RegisterUserScreen.css';

function mapStateToProps(state) {
  return {
    // authenticated: state.authentication.user.authenticated,
		// authenticating: state.authentication.system.authenticating,
		// dispayPassword: state.authentication.userChallenge.dispayPassword
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RegistrationActions, dispatch);
}

/*
I think for this there will be two levels of state. Use Redux to signify Registration
is done, but have the wizard state be maintained by the Registration Container.

Next Steps:
1. Stubb out navBack & navForward.
2. Make all of the props required on the children components.
3. Contiune with building the flow.
4. Get tests in place.
*/


class RegistrationContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			phase: PHASE_TYPES.INTRODUCTION,
			status: STATUS_TYPES.OK,
			nickname: '',
			password: '',
			emailAddress: '',
			verificationCode: ''
		};
		this.navBack = this.navBack.bind(this);
		this.navForward = this.navForward.bind(this);
		this.handleNicknameChange = this.handleNicknameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleCodeChange = this.handleCodeChange.bind(this);
	}

	handleNicknameChange(event){
		//event.target.value
		let nextState = Object.assign({}, this.state, {nickname: event.target.value});
		this.setState(nextState);
	}

	handlePasswordChange(event){
		//event.target.value
		let nextState = Object.assign({}, this.state, {password: event.target.value});
		this.setState(nextState);
	}

	handleEmailChange(event){
		//event.target.value
		let nextState = Object.assign({}, this.state, {emailAddress: event.target.value});
		this.setState(nextState);
	}

	handleCodeChange(event){
		//event.target.value
		let nextState = Object.assign({}, this.state, {verificationCode: event.target.value});
		this.setState(nextState);
	}

	render(){
		return (
			<div className="registerUser-overlay">
				<RegistrationHealth phase={this.state.phase} status={this.state.status}/>
				<div className="registerUser centered-widget sh-column">
					<RegistrationMessage phase={this.state.phase} status={this.state.status}/>
					<div className="sh-column interaction">
						<RegistrationPrompt ref={(ref) => this.prompt = ref}
							phase={this.state.phase}
							status={this.state.status}
							nickname={this.state.nickname}
							password={this.state.password}
							emailAddress={this.state.emailAddress}
							verificationCode={this.state.verificationCode}
							handleNicknameChange={this.handleNicknameChange}
							handlePasswordChange={this.handlePasswordChange}
							handleEmailChange={this.handleEmailChange}
							handleCodeChange={this.handleCodeChange}
							/>
						<RegistrationNav phase={this.state.phase}
						status={this.state.status}
						navBack={this.navBack}
						navForward={this.navForward}/>
					</div>
				</div>
			</div>
		);
	}

	navBack(){
		if (this.state.phase == minimumPhase()){
			return;
		}
		let nextPhase = this.state.phase - 1;
		let nextState = Object.assign({}, this.state, {phase: nextPhase});
		this.setState(nextState);
	}

	navForward(){
		if (this.state.phase == maximumPhase()){
			return;
		}
		let valid = this.prompt.validate(this.state.phase);
		let nextState;
		if(valid){
			let nextPhase = this.state.phase + 1;
			nextState = Object.assign({}, this.state, {phase: nextPhase, status: STATUS_TYPES.OK});
		}else{
			nextState = Object.assign({}, this.state, {status: STATUS_TYPES.ERROR});
		}
		this.setState(nextState);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
