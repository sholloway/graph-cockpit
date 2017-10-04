/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component} from 'react';
import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';

import RegisterUserScreen from './containers/RegisterUserScreen';
import LoginScreen from './containers/LoginScreen';
import MainScreen from './containers/MainScreen';
import GraphExplorer from './components/graph/GraphExplorer';
import ContentView from './components/contentView/ContentView';

// function requireAuth(nextState, replace){
// 	let appState = this.store.getState();
// 	if (!appState.authentication.user.authenticated) {
//     replace({
//       pathname: '/login',
// 			//Note: State is the Router state, not Redux Store.
//       state: { nextPathname: nextState.location.pathname }
//     });
// 	}
// }

// function userExists(nextState, replace){
// 	let appState = this.store.getState();
// 	if (!appState.registration.user.exists) {
//     replace({
//       pathname: '/register',
// 			//Note: State is the Router state, not Redux Store.
//       state: { nextPathname: nextState.location.pathname }
//     });
// 	}
// }

// react-router approach
// function routes(store){
// 	let that = {};
// 	that.store = store;
// 	that.requireAuth = requireAuth.bind(that);
// 	that.userExists = userExists.bind(that);
// 	return (
// 		<Route>
// 			<Route component={LoginScreen} name="Login" path = "/login"/>
// 			<Route component={RegisterUserScreen} name="Registration" path = "/register" />
// 			<Redirect from="/" to="/home" />
// 			<Route component={MainScreen} path="/home" onEnter={that.requireAuth}>
// 				<Route component={GraphExplorer} path="/home/explorer" />
// 				<Route component={ContentView} path="/home/contents" />
// 			</Route>
// 		</Route>
// 	);
// }

export const components = {
	'register': RegisterUserScreen,
	'login': LoginScreen,
	'main': MainScreen,
	'graph_explorer': GraphExplorer,
	'content_view': ContentView
};

export default function configureRouter(){
	const routes = [
		{
			name: 'register',
			path: '/user/registration'
		},
		{
			name: 'login',
			path: '/user/login'
		},
		{
			name: 'main',
			path: '/home',
			children: [
				{ name: 'graph_explorer', path: '/explorers/graph'},
				{ name: 'content_view', path: '/views/content'}
			]
		}
	];

	const routerOptions = {
		defaultRoute: 'main'
	};

	//Perhaps rewrite this as a nested function for clarity.
	const isAuthenticated = (router) => (toState, fromState) => {
    return true;
	};

	const router = createRouter(routes, routerOptions);
	router.usePlugin(loggerPlugin);
	router.usePlugin(listenersPlugin());
	router.canActivate('main', isAuthenticated);
	return router;
}
