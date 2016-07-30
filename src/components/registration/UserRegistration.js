/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UserRegistration.css';

class UserRegistration extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div>
				<p>User Registration</p>
			</div>
		);
	}
}

export default UserRegistration;
