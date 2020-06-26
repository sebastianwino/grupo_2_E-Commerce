var express = require('express');
var router = express.Router();
const shoppingCartControllers = require('../controllers/shoppingCartControllers');

router.get('/', shoppingCartControllers.root);


module.exports = router;
