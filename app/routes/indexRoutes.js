var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', indexControllers.root);

module.exports = router;
