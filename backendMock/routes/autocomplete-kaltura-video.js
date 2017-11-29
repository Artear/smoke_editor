module.exports = function(router) {
	router.get('/smoke-editor/autocomplete/kaltura-video/*', function(req, res, next) {
		res.send([
			{
				"nid": "468534",
				"title": "Buffon, el h\u00e9roe: le dio a Italia el tercer puesto - video 1",
				"kalturaid": "0_uuhav215",
				"genoaid": "424383"
			},
			{
				"nid": "590150",
				"title": "Macri, en ShowMatch",
				"kalturaid": "0_e7p3mxn6",
				"genoaid": "318488"
			},
			{
				"nid": "709268",
				"title": "Que viva el fair play: Buffon aplaudi\u00f3 el himno de Francia cuando sus compatriotas lo silbaban",
				"kalturaid": "0_1nayt7uz",
				"genoaid": "217816"
			}
		]);
	})
};
