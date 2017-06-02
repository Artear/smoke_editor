module.exports = function (router) {
	router.get('/smoke-editor/autocomplete/related-user-article/:id', function (req, res, next) {
		if (req.params.id.replace(/0/g, '') === '') {
			res.status(400).send('La nota ingresada es inválida!');
			return;
		}

		if (req.params.id.replace(/0/g, '') === '1') {
			res.status(400).send('La nota ingresada aún no está publicada!');
			return;
		}

		if (parseInt(req.params.id) % 2 === 0) {
			res.send({
				"nid": req.params.id,
				"title": "Entidad P\u00fablica sigue incumpliendo (nota con imagenes)",
				"images": [
					{
						"fid": "123",
						"url": "http:\/\/cdn-stg.tn.com.ar\/sites\/default\/files\/2016\/09\/06\/20160802_111019.jpg"
					},
					{
						"fid": "456",
						"url": "http:\/\/cdn-stg.tn.com.ar\/sites\/default\/files\/styles\/1366x765\/public\/2017\/05\/29\/skyairlines.jpg"
					}
				]
			});
		} else {
			res.send({
				"nid": req.params.id,
				"title": "Espectacular gol de chilena (nota con videos)",
				"videos": [
					{
						"kaltura_id": "0_9hp232pg",
						"kaltura_url": "http://vodgc.com/p/107/sp/10700/playManifest/entryId/0_9hp232pg/format/url/protocol/http"
					}
				]
			});
		}
	});
};
