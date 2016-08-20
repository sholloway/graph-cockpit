import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import main from './main';
import authentication from './authentication';
import registration from './registration';

const rootReducer = combineReducers({
	main,
  authentication,
	registration,
  routing
});

export default rootReducer;
