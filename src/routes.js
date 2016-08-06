/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component} from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import UserRegistration from './components/registration/UserRegistration.js';
import LoginScreen from './containers/LoginScreen';
import MainScreen from './containers/MainScreen';
import GraphExplorer from './components/graph/GraphExplorer';
import ContentView from './components/contentView/ContentView';
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

function requireAuth(nextState, replace){
	let appState = this.store.getState();
	// console.log("In onEnter hook for /home");
	// console.log(appState);
	if (!appState.authentication.user.authenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname } //Note: State is the Router state, not Redux Store.
    });
	}
}

function routes(store){
	let that = {};
	that.store = store;
	that.requireAuth = requireAuth.bind(that);
	return (
		<Route>
			<Route component={LoginScreen} name="Login" path = "/login" />
			<Route component={UserRegistration} name="Registration" path = "/register" />
			<Redirect from="/" to="/home" />
			<Route component={MainScreen} path="/home" onEnter={that.requireAuth}>
				<Route component={GraphExplorer} path="/home/explorer" />
				<Route component={ContentView} path="/home/contents" />
			</Route>
		</Route>
	);
}

export default routes;
