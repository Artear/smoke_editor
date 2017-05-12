module.exports = function (router) {
	router.get('/smoke-editor/autocomplete/related-user-article/*', function (req, res, next) {
		res.send({
			"nid": "700000",
			"title": "Entidad P\u00fablica del Registro Provincial de las Personas sigue incumpliendo",
			"image": "http:\/\/cdn-stg.tn.com.ar\/sites\/default\/files\/2016\/09\/06\/20160802_111019.jpg"
		});
	});
};
