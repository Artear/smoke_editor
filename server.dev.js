var express = require("express");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.dev");

var app = express();
var compiler = webpack(webpackConfig);

const DEFAULT_PORT = 8081;
const port = process.env.PORT || DEFAULT_PORT;

app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));

app.get('/test', function(req, res) {
	res.send('ok')
})

app.listen(port, function () {
	console.log(` - SmokeEditor dev server listening on port ${port} - `);
});
