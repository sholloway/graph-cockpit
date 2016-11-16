require('babel-polyfill');
require('babel-register')({
  presets: ["babel-preset-es2015",
    "babel-preset-react"],
  extensions: [".jsx", ".js"],
  plugins: [
    ["babel-plugin-rewire"],
    ["webpack-loaders", { "config": "webpack.config-test.babel.js", "verbose": false }]
  ]
});

let jsdom = require('jsdom').jsdom;

let exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;


Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// global.window.electron =  require('electron');
