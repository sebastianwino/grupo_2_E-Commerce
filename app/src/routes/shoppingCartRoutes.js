var express = require('express');
var router = express.Router();
const shoppingCartControllers = require('../controllers/shoppingCartControllers');

// Revisar si se puede llenar el carrito, sin estar logueado
const carritoMiddleware = require('../middlewares/carritoMiddleware')

router.get('/', shoppingCartControllers.root);

router.post('/', shoppingCartControllers.distroy);

router.post('/pre-finalizacion', shoppingCartControllers.previousPurchase);

router.put('/modificacion', shoppingCartControllers.modification);

module.exports = router;
