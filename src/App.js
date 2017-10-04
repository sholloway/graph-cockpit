/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][Provider]" }]*/
const config = require('./config.js');
import { bindActionCreators } from 'redux';
import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import { routeNodeSelector } from 'redux-router5';
import { RouterProvider } from 'react-router5';
import { connect, Provider } from 'react-redux';

import AppContainer from './containers/AppContainer.js'
import configureRouter, {components} from './routes';
import configureStore from './store/configureStore';
import createRootReducer from './reducers';
import NotFound from './components/error/NotFound.js'

const WEBSOCKET_DOMAIN = config.engine.communication.webserver.host
const WEBSOCKET_PORT = config.engine.communication.webserver.port
const WEBSOCKET_PROTOCOL = config.engine.communication.webserver.protocol

//TODO: Change protocol to be wss for TLS.
let websocket = {}; //Not used while attempting to wire up router5.
// let websocket = new WebSocket(`ws:${WEBSOCKET_DOMAIN}:${WEBSOCKET_PORT}/ws`,WEBSOCKET_PROTOCOL);
//
// websocket.onopen = () => {
// 	store.dispatch({
// 		type: 'SET_CONNECTION_STATE',
// 		connectionState: 'open'
// 	});
// };
//
// websocket.onclose = () => {
// 	store.dispatch({
// 		type: 'SET_CONNECTION_STATE',
// 		connectionState: 'closed'
// 	});
// };
//
// websocket.onerror = (error) => {
// 	store.dispatch({
// 		type: 'SET_CONNECTION_STATE',
// 		connectionState: 'error',
// 		error: error
// 	});
// };
//
// websocket.onmessage = (event) => {
// 	store.dispatch({
// 		type: 'ENGINE_MESSAGE',
// 		message: JSON.parse(event.data),
// 		meta:{
// 			remote: true
// 		}
// 	});
// };

//TODO: Pull App into its own module.


let router = configureRouter();
let initialState = {};
const rootReducer = createRootReducer();
const store = configureStore(router, rootReducer, initialState, websocket);
const wrappedApp = (<Provider store={store}>
	<RouterProvider router={router}>
		<AppContainer />
	</RouterProvider>
</Provider>);

router.start('/home',(err, state) => {
	ReactDOM.render(wrappedApp, document.getElementById('root'));
});
