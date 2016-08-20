/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {PHASE_TYPES, STATUS_TYPES} from '../../../constants/registrationTypes';
import './RegistrationHealth.css';

const HEALTH_STYLES = {
	HEALTHY: 'reg-healthy',
	ERROR: 'reg-error',
	LAUNCH: 'reg-launch'
};

class RegistrationHealth extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		let healthStyle = this._selectHealthStyle(this.props.phase, this.props.status);
		let cn = `registrationHealth ${healthStyle}`;
		return(
			<div className="registrationHealth-container">
				<div className={cn}></div>
			</div>
		);
	}

	_selectHealthStyle(phase, status){
		if (phase == PHASE_TYPES.LAUNCH){
			return HEALTH_STYLES.LAUNCH;
		}
		let style = (status === STATUS_TYPES.OK)? HEALTH_STYLES.HEALTHY : HEALTH_STYLES.ERROR;
		return style;
	}
}
RegistrationHealth.propTypes = {
	phase: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired
};

export default RegistrationHealth;
