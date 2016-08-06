/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApplicationMenu from '../components/menu/ApplicationMenu';
import GraphExplorer from '../components/graph/GraphExplorer';
import ContentView from '../components/contentView/ContentView';
import StatusBar from '../components/statusbar/StatusBar';

import * as MainActions from '../actions/main';

function mapStateToProps(state){
  return {};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(MainActions, dispatch);
}

class MainScreen extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		return(
			<div className="main sh-column">
				<div className="main-content sh-row">
					<ApplicationMenu />
					<GraphExplorer />
					<ContentView />
				</div>
				<StatusBar />
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
