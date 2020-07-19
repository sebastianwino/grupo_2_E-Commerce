var express = require('express');
var router = express.Router();
const productsControllers = require('../controllers/productsControllers');
const edicionProductosMiddleware = require('../middlewares/edicionProductosMiddleware');
const edicionMiddleware = require ('../middlewares/edicionMiddleware')
const authEditMiddleware = require ('../middlewares/authEditMiddleware')

router.get('/', edicionProductosMiddleware, productsControllers.root); /*All products */

router.get('/detalle/:productId', edicionMiddleware ,productsControllers.detail); /*Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', productsControllers.create); /* Form to create */
router.post('/crear', productsControllers.store); /* Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/editar/:productId',authEditMiddleware, productsControllers.edit); /* Form to create */
router.put('/editar/:productId', authEditMiddleware, productsControllers.update); /* Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/eliminar/:productId', productsControllers.destroy); /* Delete from DB */

/*  SEARCH PRODUCTS */
router.get('/search', productsControllers.search)

module.exports = router;
