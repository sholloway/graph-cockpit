let nodeExternals = require('webpack-node-externals');
let path = require('path');

module.exports = {
  target: 'node',
  module: {
    rules: [
      {
				test: /\.jsx?$/, //Transform both Javascript and React JSX files.
				include:[path.resolve(__dirname, "src")],
				loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        }
      },
      {
				test: /\.css$/,
				include:[path.resolve(__dirname, "src")],
				use: [
					{ loader: 'style-loader' }, //Adds CSS to the DOM by injecting a <style> tag.
					{ loader: 'css-loader' }    //Interpets @import and url() and resolves them.
					//I'd like to leverate PostCSS's style-guide plugin.
					//https://webpack.js.org/loaders/postcss-loader/
					//https://github.com/morishitter/postcss-style-guide
				]
			}
    ]
  },
  resolve: {
		modules: [
      "node_modules"
		],
		extensions: [".js", ".json", ".jsx", ".css"],
	},
  externals: [
    function (context, request, callback) {
			if (skipModules.includes(request)) {
				return callback(null, "require('" + request + "')");
			}
			return callback();
    }
	],
};
