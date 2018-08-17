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

	function isAuthenticated(state){
		console.log('The state passed to isAuthenticated:');
		console.log(state);
		/*
		Bug:
		Right now this is null.
		When the app loads, there is no fromState. So it should prevent the user from
		navigating to home.
		*/
		return true;
	}

	const requireAuthentication = (router) => (toState, fromState, done) => {
		// if (isAuthenticated(store.getState())){
		if (isAuthenticated(fromState)){
			return true;
		}else{
			const result = {
				redirect: {
					name: 'login',
					params:{
						nextName: toState.name,
						nextParams: toState.params
					}
				}
			};
			return done(result);
		}
	};

	const router = createRouter(routes, routerOptions);
	router.usePlugin(loggerPlugin);
	router.usePlugin(listenersPlugin());
	router.canActivate('main', requireAuthentication);
	return router;
}
