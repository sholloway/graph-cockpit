/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][Provider]" }]*/
const config = require('./config.js');
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const WEBSOCKET_DOMAIN = config.engine.communication.webserver.host
const WEBSOCKET_PORT = config.engine.communication.webserver.port
const WEBSOCKET_PROTOCOL = config.engine.communication.webserver.protocol

//TODO: Change protocol to be wss for TLS.
/* TODO: Don't do this until after the Identity Service has been engaged to
 produce a session token. */
let websocket = new WebSocket(`ws:${WEBSOCKET_DOMAIN}:${WEBSOCKET_PORT}/ws`,WEBSOCKET_PROTOCOL);

websocket.onopen = () => {
	store.dispatch({
		type: 'SET_CONNECTION_STATE',
		connectionState: 'open'
	});
};

websocket.onclose = () => {
	store.dispatch({
		type: 'SET_CONNECTION_STATE',
		connectionState: 'closed'
	});
};

websocket.onerror = (error) => {
	store.dispatch({
		type: 'SET_CONNECTION_STATE',
		connectionState: 'error',
		error: error
	});
};

websocket.onmessage = (event) => {
	store.dispatch({
		type: 'ENGINE_MESSAGE',
		message: JSON.parse(event.data),
		meta:{
			remote: true
		}
	});
};

let initialState = {};
const store = configureStore(initialState, websocket);
const history = syncHistoryWithStore(hashHistory, store);

import './global.css';

class App extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return (
			<Provider store={store}>
				<Router history={history} routes={routes(store)} />
			</Provider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
