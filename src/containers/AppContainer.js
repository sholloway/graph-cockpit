/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[React][ApplicationMenu]" }]*/
import React, {Component, createElement} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {components} from '../routes';

import './global.css';
class AppContainer extends Component{
	constructor(props) {
    super(props);
	}

	componentWillMount (){
	}

	render(){
		const route = this.props.route;
		console.log(`Props: ${JSON.stringify(this.props)}`)
		console.log(`Route: ${route}`);
    const component = route ? route.name.split('.')[0] : undefined;
		console.log(`Routed Component: ${component}`);
		return createElement(components[component] || NotFound);
	}
}

function mapStateToProps(state){
  return {
		route: state.router.route
	};
}

function mapDispatchToProps(dispatch){
	const emptyActions = {};
  return bindActionCreators(emptyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
