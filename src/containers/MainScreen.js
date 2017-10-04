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
  return {
		findBar: {
			displayed: state.main.findBar.displayed
		},
		sceneGraph: state.graphManipulation.sceneGraph,
		contextMenu: state.standardLayout.contextMenu,
		mouse: state.standardLayout.mouse
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
					<GraphExplorer sceneGraph={this.props.sceneGraph}
						contextMenu={this.props.contextMenu}
						mouse={this.props.mouse}
						createElement={this.props.createElement}
						deleteElement={this.props.deleteElement}
						canvasClicked={this.props.standardLayoutCanvasClicked}
						canvasRightClicked={this.props.standardLayoutCanvasRightClicked}
						elementClicked={this.props.standardLayoutElementClicked}
						displayElementContexMenu={this.props.standardLayoutDisplayContextMenu}
						elementDragStarted={this.props.standardLayoutDragStarted}
						elementDrag={this.props.standardLayoutDrag}
						elementDragEnded={this.props.standardLayoutDragEnded}
						/>
					<ContentView />
				</div>
				<FindBar displayed={this.props.findBar.displayed}
					escWasPressed={this.props.escWasPressed}/>
				<StatusBar />
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
