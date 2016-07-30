/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UserChallenge.css';

class UserChallenge extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div className="userChallenge">
				<p>User Challenge</p>
			</div>
		);
	}
}

export default UserChallenge;
