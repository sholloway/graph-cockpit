const path = require('path');
const environment = (process.env.NODE_ENV)? process.env.NODE_ENV : 'development';
const devTools = (environment === 'development')? 'source-map' : null;
const skipModules = [
	'electron'
];

module.exports = {
	mode: environment,
  entry: {
    app: ['./src/App.js']
	},
  output: {
    path: path.join(__dirname, "public/graph-cockpit"),
    filename: "app.js",
    publicPath: '/graph-cockpit/'
	},
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
  plugins: [
		new CleanWebpackPlugin(['public/graph-cockpit'])
	],
  resolve: {
		modules: [
      "node_modules",
      path.resolve(__dirname, "src") //Might not need this one.
		],
		extensions: [".js", ".json", ".jsx", ".css"],
	},
	devtool: devTools,
	/* Exclude some modules from the generated bundle. */
  externals: [
    function (context, request, callback) {
			if (skipModules.includes(request)) {
				return callback(null, "require('" + request + "')");
			}
			return callback();
    }
	],
};
