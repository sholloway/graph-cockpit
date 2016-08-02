import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authentication from './authentication';

const rootReducer = combineReducers({
  authentication,
  routing
});

export default rootReducer;
