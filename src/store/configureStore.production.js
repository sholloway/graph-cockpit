/*eslint no-console: 0*/
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const routerMiddle = routerMiddleware(hashHistory);
const enhancer = applyMiddleware(routerMiddle);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
