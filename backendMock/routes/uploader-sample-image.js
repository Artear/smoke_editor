const path = require('path');

module.exports = function(router) {
	router.get('/sites/default/files/uploader/sample.jpg', function (req, res, next) {
		res.sendFile(path.join(__dirname, '..', 'resources', 'sample.jpg'));
	});
};
