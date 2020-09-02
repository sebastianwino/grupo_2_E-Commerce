var express = require('express');
var router = express.Router();

const controllers = require('../controllers')

router.get('/', controllers.cart.root);

router.post('/', controllers.cart.store);

router.put('/', controllers.cart.update);

router.delete('/', controllers.cart.destroy);


module.exports = router;
