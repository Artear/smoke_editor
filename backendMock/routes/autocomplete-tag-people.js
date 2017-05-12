module.exports = function(router) {
	router.get('/smoke-editor/autocomplete/tag-people/*', function (req, res, next) {
		res.send([
			{
				"tid": "43444",
				"tag": "Ronaldo",
				"tagUrl": "personajes\/ronaldo",
				"name": "Ronaldo :: Personas"
			},
			{
				"tid": "13266",
				"tag": "Ronaldo",
				"tagUrl": "tags\/ronaldo",
				"name": "Ronaldo :: Tags"
			},
			{
				"tid": "42679",
				"tag": "Ronaldo Boyd",
				"tagUrl": "personajes\/ronaldo-boyd",
				"name": "Ronaldo Boyd :: Personas"
			}
		]);
	});
};
