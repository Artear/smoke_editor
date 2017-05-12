module.exports = function(router) {
	router.get('/smoke-editor/autocomplete/related-content/*', function (req, res, next) {
		res.send([
			{
				"href": "\/deportes\/messi-roso_050900",
				"title": "Messi roso",
				"nid": "50900"
			},
			{
				"href": "\/deportes\/pobre-messi_060171",
				"title": "Pobre Messi",
				"nid": "60171"
			},
			{
				"href": "\/deportes\/llego-messi_011094",
				"title": "Llegó Messi",
				"nid": "11094"
			}
		]);
	});
};
