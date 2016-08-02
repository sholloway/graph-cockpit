/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component} from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';

import ApplicationMenu from './components/menu/ApplicationMenu.js';
import UserRegistration from './components/registration/UserRegistration.js';
import Login from './components/challenge/UserChallenge.js';
import GraphExplorer from './components/graph/GraphExplorer.js';
import ContentView from './components/contentView/ContentView.js';
import StatusBar from './components/statusbar/StatusBar.js';

import './App.css'; //TODO Rename

/*
Next Steps:
Redesign this module to return a builder function.
Take the Store as a parameter.
Bind the store to requireAuth's "this" object.
Change <Route component={Master} path="/home" onEnter={requireAuth}> to be
	<Route component={Master} path="/home" onEnter={this.requireAuth}>

Resources:
	https://github.com/reactjs/react-router-redux/issues/20
	https://github.com/joshgeller/react-redux-jwt-auth-example/blob/master/src/components/AuthenticatedComponent.js


Just get it to compile.
Use Dev Tools (?) To set the state.
*/

//TODO Move to dedicated file.
class Master extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div className="master">
				<UserRegistration />
				<UserChallenge />
				<div>
					<ApplicationMenu />
					<GraphExplorer />
					<ContentView />
				</div>
				<StatusBar />
			</div>
		);
	}
}

function requireAuth(nextState, replace){
	if (!this.store.getState().loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
	}
}

function routes(store){
	let that = {};
	that.store = store;
	that.requireAuth = requireAuth.bind(that);
	return (
		<Route>
			<Route component={Login} name="Login" path = "/login" />
			<Route component={UserRegistration} name="Registration" path = "/register" />
			<Redirect from="/" to="/home" />
			<Route component={Master} path="/home" onEnter={that.requireAuth}>
				<Route component={GraphExplorer} path="/home/explorer" />
				<Route component={ContentView} path="/home/contents" />
			</Route>
		</Route>
	);
}

export default routes;
