export default websocket => store => next => action => {
  //Process messages from the engine.
  if (action.meta && action.meta.remote) {
    console.log('EngineWebSocketMiddleware: Remote message');
    console.log(action);
  }else{
    switch (action.type){
      case 'REGISTER_USER_REQUEST':
        // ws.send(...); //Send the web socket request to the engine.
        console.log('EngineWebSocketMiddleware: REGISTER_USER_REQUEST');
        break;
      case 'SET_CONNECTION_STATE':
        console.log('EngineWebSocketMiddleware: SET_CONNECTION_STATE');
        console.log(action);
      default:
        console.log(`EngineWebSocketMiddleware: ${action.type}`);
    }
  }
  return next(action);
}
