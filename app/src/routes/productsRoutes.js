var express = require('express');
var router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.root); /* All products */

/***  SEARCH PRODUCTS ***/
router.get('/search',productsControllers.search);

router.get('/:productId' ,productsControllers.detail); /* Product detail */

module.exports = router;