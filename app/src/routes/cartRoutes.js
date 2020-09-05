var express = require('express');
var router = express.Router();
let updateCartMiddleware = require('../middlewares/cartsMiddlewares/updateCartMiddleware')

const controllers = require('../controllers')

router.get('/', controllers.cart.root);

router.post('/', updateCartMiddleware, controllers.cart.store);

router.put('/', controllers.cart.update);

router.delete('/', controllers.cart.destroy);


module.exports = router;