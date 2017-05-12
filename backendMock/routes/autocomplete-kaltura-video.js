module.exports = function(router) {
	router.get('/smoke-editor/autocomplete/kaltura-video/*', function(req, res, next) {
		res.send([
			{
				"nid": "468534",
				"title": "Buffon, el h\u00e9roe: le dio a Italia el tercer puesto - video 1",
				"kalturaid": "0_uuhav215"
			},
			{
				"nid": "743450",
				"title": "\u00a1Ay, Buffon! El arquero le pifi\u00f3 a la pelota y Espa\u00f1a aprovech\u00f3 para hacer el gol",
				"kalturaid": "0_d6vuxia3"
			},
			{
				"nid": "709268",
				"title": "Que viva el fair play: Buffon aplaudi\u00f3 el himno de Francia cuando sus compatriotas lo silbaban",
				"kalturaid": "0_1nayt7uz"
			}
		]);
	})
};
