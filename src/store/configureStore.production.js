/*eslint no-console: 0*/
import { createStore, applyMiddleware } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import wsMiddleware from '../communication/ws/EngineWebSocketMiddleware';

export default function configureStore(initialState, websocket) {
	const createStoreWithMiddleware = applyMiddleware(router5Middleware(router))(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
  // const enhancer = applyMiddleware(routerMiddle, logger, wsMiddleware(websocket));
  // return createStore(rootReducer, initialState, enhancer);
	return store;
}
