/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UserChallenge.css';

export const TEXT_INPUT_TYPE = "text";
export const PASSWORD_INPUT_TYPE = "password";

class UserChallenge extends Component{
	constructor(props) {
    super(props);

		//Bind all event handlers so they don't have to be bound in the JSX.
		this.showPasswordToggle = this.showPasswordToggle.bind(this);
		this.login = this.login.bind(this);

		this.state = { passwordBoxType: PASSWORD_INPUT_TYPE};
	}

	componentWillMount (){
	}

	render(){
		return(
			<div className="userChallenge sh-column">
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
					<input type={this.state.passwordBoxType}
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
							onClick={this.showPasswordToggle} /> Show Password
					</label>
					<button className="sh-button sh-clickable"
						onClick={this.login}>login</button>
				</div>
			</div>
		);
	}

	/*
	Can you make a function private in an ES6 class?
	*/
	login(){
		let user = {};
		user.username = this.userNameTextBox.value;
		user.password = this.passwordBox.value;
		console.log(user);
		//I will generate the hash right here and even assign the pwd to a field.
	}

	showPasswordToggle(event){
		let passwordBoxType = (event.target.checked)? TEXT_INPUT_TYPE : PASSWORD_INPUT_TYPE;
		let mutatedState = this.state;
		mutatedState.passwordBoxType = passwordBoxType;
		this.setState(mutatedState);
	}
}

export default UserChallenge;
