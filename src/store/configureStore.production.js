/*eslint no-console: 0*/
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import wsMiddleware from '../communication/ws/EngineWebSocketMiddleware';

export default function configureStore(initialState, websocket) {
  const routerMiddle = routerMiddleware(hashHistory);
  const enhancer = applyMiddleware(routerMiddle, wsMiddleware(websocket));
  return createStore(rootReducer, initialState, enhancer);
}
