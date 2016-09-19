import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import main from './main';
import authentication from './authentication';
import registration from './registration';
import graphManipulation from './graphManipulation';
import standardLayout from './standardLayout';

const rootReducer = combineReducers({
	main,
  authentication,
	registration,
  routing,
	graphManipulation,
	standardLayout
});

export default rootReducer;
