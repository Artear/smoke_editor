var formidable = require('formidable');

// TODO: move to routes, so dev server can be launched standalone
module.exports = function(app) {
	app.post('/backoffice/uploader/image.json', function(req, res, next) {
		var form = new formidable.IncomingForm();

		// Simulate response for broken files when the image filename ends in "_broken"
		form.parse(req, function(err, fields, files) {
			if (fields.resumableRelativePath && fields.resumableRelativePath.match(/_broken\.\w{3,4}$/)) {
				res.status(400).send('Image not valid!');
				return;
			}

			res.send({ "file":"sample.jpg" });
		});

	})
};
