module.exports = function(router) {
	router.get('/smoke-editor/get/latest-three-articles-by-tid/*', function (req, res, next) {
		res.send([
			{
				"nid": "750835",
				"url": "\/deportes\/esencial\/como-ronaldo-al-compostela-una-maravilla-de-gol-de-la-barcelonista-barbara-latorre_750835",
				"title": "Como Ronaldo al Compostela: una maravilla de gol de la barcelonista B\u00e1rbara Latorre"
			},
			{
				"nid": "749151",
				"url": "\/deportes\/esencial\/el-gordo-ronaldo-tiro-una-bomba-y-en-barcelona-le-hicieron-la-cruz_749151",
				"title": "El Gordo Ronaldo tir\u00f3 una BOMBA y en Barcelona le hicieron la cruz"
			},
			{
				"nid": "747729",
				"url": "\/deportes\/after-play\/el-lobo-zavibaka-es-la-mascota-oficial-del-mundial-de-rusia-2018_747729",
				"title": "El lobo Zavibaka es la mascota oficial del Mundial de Rusia 2018"
			}
		]);
	})
};
