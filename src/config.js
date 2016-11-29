module.exports = {
  engine:{
    communication:{
      //Something to consider: I need the ability to turn on the engine and
      //tell it what port to listen to. I also want the ability to connect
      //to a remote engine.
      webserver:{
        host: 'localhost',
        port: '2324'
      }
    },
    graphdb{
      path: '/Applications/Mod89\ Machine.app/Contents/db'
    },
    logging:{
      level: 'DEBUG'
    }
  }
};
