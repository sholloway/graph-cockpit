/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component} from 'react';
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router';
import RegisterUserScreen from './containers/RegisterUserScreen';
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
*/

function requireAuth(nextState, replace){
	let appState = this.store.getState();
	if (!appState.authentication.user.authenticated) {
    replace({
      pathname: '/login',
			//Note: State is the Router state, not Redux Store.
      state: { nextPathname: nextState.location.pathname }
    });
	}
}

function userExists(nextState, replace){
	let appState = this.store.getState();
	if (!appState.registration.user.exists) {
    replace({
      pathname: '/register',
			//Note: State is the Router state, not Redux Store.
      state: { nextPathname: nextState.location.pathname }
    });
	}
}

function routes(store){
	let that = {};
	that.store = store;
	that.requireAuth = requireAuth.bind(that);
	that.userExists = userExists.bind(that);
	return (
		<Route>
			<Route component={LoginScreen} name="Login" path = "/login"/>
			<Route component={RegisterUserScreen} name="Registration" path = "/register" />
			<Redirect from="/" to="/home" />
			<Route component={MainScreen} path="/home" onEnter={that.requireAuth}>
				<Route component={GraphExplorer} path="/home/explorer" />
				<Route component={ContentView} path="/home/contents" />
			</Route>
		</Route>
	);
}

export default routes;
