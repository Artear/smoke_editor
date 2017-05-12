module.exports = function(router) {
	router.post('/backoffice/uploader/image.json', function (req, res, next) {
		res.send({
			"file": "sample.jpg"
		});
	});
};
