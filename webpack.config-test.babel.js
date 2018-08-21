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
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options:{
							modules: true
						}
				 	}
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
