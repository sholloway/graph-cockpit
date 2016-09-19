/*eslint no-console: 0*/
/** Redux middleware to route actions and state to the console.
*/
const logger = store => next => action => {
  // console.group(action.type);
  // console.info('dispatching', action);
  let result = next(action);
  // console.log('next state', store.getState());
  // console.groupEnd(action.type);
  return result;
};

export default logger;
