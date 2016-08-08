import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import main from './main';
import authentication from './authentication';

const rootReducer = combineReducers({
	main,
  authentication,
  routing
});

export default rootReducer;
