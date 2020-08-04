var express = require('express');
var router = express.Router();

const controllers = require('../controllers')

/* GET home page. */
router.get('/', controllers.index.root);

module.exports = router;
