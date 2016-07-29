/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { Router, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import routes from './routes';
// import configureStore from './store/configureStore';
// import './app.global.css';

// const store = configureStore();
// const history = syncHistoryWithStore(hashHistory, store);

import ApplicationMenu from './components/menu/ApplicationMenu.js';

class App extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div>
				<ApplicationMenu />
				<p>
					Hello Nurse!..
				</p>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
