/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][Provider]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

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
