const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const port = parseInt(process.env.PORT) || 8081;
const backendMockPort = port + 1;

let buildPath = path.resolve(__dirname, 'build');

const devServerConfig = require('./webpack-dev-server.config.js')({
	contentBase: buildPath,
	port,
	backendMockPort
});
require('./backendMock/server');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	// working dir

	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		`webpack-dev-server/client?http://localhost:${port}`,
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates

		'./index.dev.js'
		// the entry point of our app
	],

	devServer: devServerConfig,

	output: {
		path: buildPath,
		filename: 'bundle.js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
				loader: 'file-loader?name=[path][name].[ext]'
			}
		],
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates,

		new HtmlWebpackPlugin({
			template: 'index.dev.ejs',
			filename: 'index.html',
			inject: 'body',
			editorDefault: JSON.stringify(require('./src/editor-default.dev.json'))
		}),

		new ProgressBarPlugin({ clear: false })
	]
};

