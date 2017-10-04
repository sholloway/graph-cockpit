import { createStore, applyMiddleware } from 'redux';
// import logger from '../logger/loggerMiddleware';
import logger from 'redux-logger';
import { router5Middleware, router5Reducer } from 'redux-router5';
import wsMiddleware from '../communication/ws/EngineWebSocketMiddleware';

export default function configureStore(router,
	rootReducer,
	initialState,
	websocket) {

	const createStoreWithMiddleware = applyMiddleware(
		router5Middleware(router),
		logger //The logger must be the last middleware registered if using redux-logger.
	)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);
  // const enhancer = applyMiddleware(routerMiddle, logger, wsMiddleware(websocket));
  // return createStore(rootReducer, initialState, enhancer);
	return store;
}
