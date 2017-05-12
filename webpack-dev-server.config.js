module.exports = function({ contentBase, port, backendMockPort }) {
	const devServerConfig = {
		hot: true,
		// enable HMR on the server

		inline: true,

		contentBase: contentBase,
		// match the output path

		publicPath: '/',
		// match the output `publicPath`,

		port: port,

		stats: {
			colors: true
		}
	};

	const proxiedPaths = require('./backendMock/config/proxiedPaths');
	devServerConfig.proxy = proxiedPaths.reduce((all, path) => {
		all[path] = `http://localhost:${backendMockPort}`;
		return all;
	}, {});

	devServerConfig.setup = require('./backendMock/config/devServerOverride');

	return devServerConfig;
};
