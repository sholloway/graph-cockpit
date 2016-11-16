let nodeExternals = require('webpack-node-externals');
let path = require('path');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      { test: /\.css$/, loader: 'null' },
      { test: /\.less$/, loader: 'null'}
    ]
  },
  resolve: { fallback: path.join(__dirname, "node_modules") },
  externals: [
    nodeExternals(), // in order to ignore all modules in node_modules folder
    (function(){
      var IGNORES = [
        'electron'
      ];
      return function(context, request, callback){
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
};
