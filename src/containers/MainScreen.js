/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ApplicationMenu from '../components/menu/ApplicationMenu';
import GraphExplorer from '../components/graph/GraphExplorer';
import ContentView from '../components/contentView/ContentView';
import FindBar from '../components/find/FindBar.js';
import StatusBar from '../components/statusbar/StatusBar';

import * as MainActions from '../actions/main';

function mapStateToProps(state){
	console.log(state);
  return {
		findBar: {
			displayed: state.main.findBar.displayed
		}
	};
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
					<ApplicationMenu launchFindElementGUI={this.props.launchFindElementGUI}/>
					<GraphExplorer />
					<ContentView />
				</div>
				<FindBar displayed={this.props.findBar.displayed}/>
				<StatusBar />
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
