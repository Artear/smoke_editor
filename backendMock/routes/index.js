const express = require('express');
const router = express.Router();
const requireDir = require('require-dir');
const routes = requireDir('.');

for (const key in routes) {
	routes[key](router);
}

module.exports = router;

