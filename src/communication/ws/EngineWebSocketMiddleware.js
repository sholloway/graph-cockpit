export default websocket => store => next => action => {
  //Process messages from the engine.
  if (action.meta && action.meta.remote) {
    console.log('EngineWebSocketMiddleware: Remote message');
    console.log(action);
  }else{
    switch (action.type){
      case 'REGISTER_USER_REQUEST':
        console.log('EngineWebSocketMiddleware: REGISTER_USER_REQUEST');
        let request = {
          user: 'Sam',
          actionType: 'Create',
          scope: 'UserSpace',
          entityType: 'DataSet',
          filter: 'None',
          options: {
            name: 'First Dataset',
            description: 'Trying to establish a websocket connection.'
          }
        };
        websocket.send(JSON.stringify(request));
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
