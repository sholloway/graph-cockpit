/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][Provider]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

//TODO: Pull into config file.
//TODO: Change protocol to be wss for TLS.
//TODO: Pull the websocket config into its own module.
let websocket = new WebSocket('ws:localhost:2324/ws','engine.json.v1');

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
