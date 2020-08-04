var express = require('express');
var router = express.Router();

const controllers = require('../controllers')

/*** SHOW PRODUCTS ***/ 
router.get('/', controllers.products.root); /* All products */

/***  SEARCH PRODUCTS ***/
router.get('/search', controllers.products.search);

/*** SHOW ONE PRODUCT ***/ 
router.get('/:productId', controllers.products.detail); /* Product detail */


module.exports = router;