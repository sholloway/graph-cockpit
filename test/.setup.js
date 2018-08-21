require('babel-polyfill');
require('babel-register')({
  presets: [
		"babel-preset-env",
		"babel-preset-react"
	],
	extensions: [".jsx", ".js"],
  plugins: [
    ["babel-plugin-rewire"]
  ]
});

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let exposedProperties = ['window', 'navigator', 'document'];
let prohibited = ['localStorage', 'sessionStorage'];

let dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document
global.window = document.defaultView;

let defaultView = document.defaultView;

if (defaultView){
	let keys = Object.keys(defaultView);
	keys.forEach((property) => {
		if (typeof global[property] === 'undefined') {
			exposedProperties.push(property);
			if (!prohibited.includes(property)){
				global[property] = document.defaultView[property];
			}
		}
	});
}

global.navigator = {
  userAgent: 'node.js'
};
