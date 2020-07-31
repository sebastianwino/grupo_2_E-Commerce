var express = require('express');
var router = express.Router();
const shoppingCartControllers = require('../controllers/shoppingCartControllers');


router.get('/', shoppingCartControllers.root);

router.post('/', shoppingCartControllers.destroy);

router.post('/pre-finalizacion', shoppingCartControllers.previousPurchase);

router.put('/modificacion', shoppingCartControllers.modification);

module.exports = router;
