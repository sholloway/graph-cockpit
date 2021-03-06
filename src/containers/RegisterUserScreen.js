/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import RegistrationHealth, {HEALTH_RENDER_STATE} from '../components/registration/health/RegistrationHealth';
import LightParticleColumn, {HEALTH_RENDER_STATE} from '../components/registration/health/LightParticleColumn';
import RegistrationMessage from '../components/registration/msg/RegistrationMessage';
import RegistrationPrompt from '../components/registration/prompt/RegistrationPrompt';
import RegistrationNav from '../components/registration/nav/RegistrationNav';
import * as RegistrationActions from '../actions/registration';
import {PHASE_TYPES, STATUS_TYPES, minimumPhase, maximumPhase} from '../constants/registrationTypes';
import './RegisterUserScreen.css';

function mapStateToProps(state) {
  return {
    userRegistered: state.registration.user.exists
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
      healthRenderState: HEALTH_RENDER_STATE.INITIALIZE,
      user:{
  			username: '',
        firstName: '',
        lastName: '',
  			password: '',
  			emailAddress: ''
      },
			verificationCode: ''
		};
		this.navBack = this.navBack.bind(this);
		this.navForward = this.navForward.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleCodeChange = this.handleCodeChange.bind(this);
	}

  componentWillUpdate(nextProps, nextState){ // eslint-disable-line no-unused-vars
		if(nextProps.userRegistered){
			this.props.router.push('/home');
		}
	}

	handleUsernameChange(event){
    let user = Object.assign({}, this.state.user, { username: event.target.value });
		let nextState = Object.assign({}, this.state, { user: user});
		this.setState(nextState);
	}

	handlePasswordChange(event){
		let user = Object.assign({}, this.state.user, { password: event.target.value });
		let nextState = Object.assign({}, this.state, { user: user});
		this.setState(nextState);
	}

	handleEmailChange(event){
    let user = Object.assign({}, this.state.user, { emailAddress: event.target.value });
		let nextState = Object.assign({}, this.state, { user: user});
		this.setState(nextState);
	}

	handleCodeChange(event){
		let nextState = Object.assign({}, this.state, {verificationCode: event.target.value});
		this.setState(nextState);
	}

	render(){
		return (
			<div className="registerUser-overlay">
				<LightParticleColumn renderState={this.state.healthRenderState}/>
				<div className="registerUser centered-widget sh-column">
					<RegistrationMessage phase={this.state.phase}
            status={this.state.status}
            nickname={this.state.user.username} />
					<div className="sh-column interaction">
						<RegistrationPrompt ref={(ref) => this.prompt = ref}
							phase={this.state.phase}
							status={this.state.status}
							nickname={this.state.user.username}
							password={this.state.user.password}
							emailAddress={this.state.user.emailAddress}
							verificationCode={this.state.verificationCode}
							handleNicknameChange={this.handleUsernameChange}
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
		let valid = this.prompt.validate(this.state.phase);
    let nextRenderState = this._findNextHealthRenderState(valid);
		let nextState;
		if(valid){
      if (this.state.phase == maximumPhase()){
        //From here fire an action so the top level state has the user registered.
        //Then on componentWillUpdate, do the route to /home.
        console.log("about to fire registerUser action");
        this.props.registerUser(this.state.user);
        return;
      }

			let nextPhase = this.state.phase + 1;

			nextState = Object.assign({}, this.state, {
        phase: nextPhase,
        status: STATUS_TYPES.OK,
        healthRenderState: nextRenderState
      });
		}else{
			nextState = Object.assign({}, this.state, {
        status: STATUS_TYPES.ERROR,
        healthRenderState: nextRenderState
      });
		}
		this.setState(nextState);
	}

  /*
  Consider if the user input is valid and the previous render state to
  deterimine the next render state for the health component.
  Possible Transitions:
    VALID == TRUE:
      Initial -> OK
      OK -> OK
      NEW ERROR -> RE-ESTABLISH OK
      EXISTING ERROR -> RE-ESTABLISH OK
      RE-ESTABLISH OK -> OK
      OK -> REGISTERED

    VALID == FALSE:
      Initial -> NEW ERROR
      RE-ESTABLISH OK -> NEW ERROR
      OK -> NEW ERROR
      NEW ERROR -> EXISTING ERROR
      ERROR -> ERROR
  */
  _findNextHealthRenderState(userInputValid){
    let nextRenderState= (userInputValid)?
      this._findValidHealthRenderState() :
      this._findInvalidHealthRenderState();
    return nextRenderState;
  }

  _findValidHealthRenderState(){
    let nextRenderState;
    switch(this.state.healthRenderState){
      case HEALTH_RENDER_STATE.INITIALIZE:
        nextRenderState = HEALTH_RENDER_STATE.HEALTHY;
        break;
      case HEALTH_RENDER_STATE.HEALTHY:
        nextRenderState = HEALTH_RENDER_STATE.HEALTHY;
        break;
      case HEALTH_RENDER_STATE.NEW_ERROR:
        nextRenderState = HEALTH_RENDER_STATE.OK_TRANSITION;
        break;
      case HEALTH_RENDER_STATE.ERROR:
        nextRenderState = HEALTH_RENDER_STATE.OK_TRANSITION;
        break;
      case HEALTH_RENDER_STATE.OK_TRANSITION:
        nextRenderState = HEALTH_RENDER_STATE.HEALTHY;
        break;
      case HEALTH_RENDER_STATE.LAUNCH:
        nextRenderState = HEALTH_RENDER_STATE.LAUNCH; //BUG Probably...
        break;
      default:
        nextRenderState = HEALTH_RENDER_STATE.HEALTHY;
    }
    return nextRenderState;
  }

  _findInvalidHealthRenderState(){
    let nextRenderState;
    switch(this.state.healthRenderState){
      case HEALTH_RENDER_STATE.INITIALIZE:
        nextRenderState = HEALTH_RENDER_STATE.NEW_ERROR;
        break;
      case HEALTH_RENDER_STATE.OK_TRANSITION:
        nextRenderState = HEALTH_RENDER_STATE.NEW_ERROR;
        break;
      case HEALTH_RENDER_STATE.HEALTHY:
        nextRenderState = HEALTH_RENDER_STATE.NEW_ERROR;
        break;
      case HEALTH_RENDER_STATE.NEW_ERROR:
        nextRenderState = HEALTH_RENDER_STATE.ERROR;
        break;
      case HEALTH_RENDER_STATE.ERROR:
        nextRenderState = HEALTH_RENDER_STATE.ERROR;
        break;
      default:
        nextRenderState = HEALTH_RENDER_STATE.ERROR;
    }
    return nextRenderState;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);
