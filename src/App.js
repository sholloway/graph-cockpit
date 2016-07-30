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

import './App.css';

import ApplicationMenu from './components/menu/ApplicationMenu.js';
import UserRegistration from './components/registration/UserRegistration.js';
import UserChallenge from './components/challenge/UserChallenge.js';
import GraphExplorer from './components/graph/GraphExplorer.js';
import ContentView from './components/contentView/ContentView.js';
import StatusBar from './components/statusbar/StatusBar.js';

class App extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div className="mainView">
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

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
