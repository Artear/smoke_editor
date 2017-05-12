module.exports = function(app) {
	app.post('/backoffice/uploader/image.json', function(req, res, next) {
		res.send({ "file":"sample.jpg" });
	})
};
