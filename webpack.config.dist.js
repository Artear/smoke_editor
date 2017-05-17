const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let distPath = path.resolve(__dirname, 'dist');

const DIST_NAME = 'smoke_editor';

const extractSass = new ExtractTextPlugin({
	filename: `${DIST_NAME}.min.css`
});

module.exports = {
	context: path.resolve(__dirname, 'src'),
	// working dir

	entry: [
		'./index.dist.js'
		// the entry point of our app
	],

	output: {
		path: distPath,
		filename: `${DIST_NAME}.min.js`,
		publicPath: './',
		library: 'SmokeEditorFactory',
		libraryTarget: 'window'
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
				use: extractSass.extract({
					use: [{
						loader: "css-loader?minimize=true"
					}, {
						loader: "sass-loader"
					}]
				})
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
				loader: 'file-loader?name=[path][name].[ext]'
			}
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		// Disables react warnings (https://github.com/facebook/react/issues/6479)

		extractSass,

		new CopyWebpackPlugin([{
			from: 'index.dist.html',
			to: 'index.html'
		}]),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			// Disables react warnings (https://github.com/facebook/react/issues/6479)
		}),

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates,

		new ProgressBarPlugin({ clear: false })
	]
};

