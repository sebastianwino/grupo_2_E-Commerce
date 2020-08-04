var express = require('express');
var router = express.Router();

const controllers = require('../controllers')

router.get('/', controllers.shoppingCart.root);

router.post('/', controllers.shoppingCart.destroy);

router.post('/pre-finalizacion', controllers.shoppingCart.previousPurchase);

router.put('/modificacion', controllers.shoppingCart.modification);

module.exports = router;
