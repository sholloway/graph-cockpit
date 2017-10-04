import { combineReducers } from 'redux';
import main from './main';
import authentication from './authentication';
import registration from './registration';
import graphManipulation from './graphManipulation';
import standardLayout from './standardLayout';
import { router5Reducer } from 'redux-router5';

export default function createRootReducer(){
	return combineReducers({
		router: router5Reducer,
		main,
	  authentication,
		registration,
		graphManipulation,
		standardLayout
	});
};
