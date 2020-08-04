var express = require('express');
var upload = require('../../middlewares/adminMiddlewares/multerMiddelware')
var router = express.Router();

const adminProductsControllers = require('../../controllers/adminControllers/adminProductsControllers');

//const authAdminMiddleware = require('../../middlewares/adminMiddlewares/authAdminMiddleware');
// const edicionProductosMiddleware = require('../../middlewares/edicionProductosMiddleware');
// const edicionMiddleware = require ('../../middlewares/edicionMiddleware');

router.get('/', adminProductsControllers.root); /* All products */

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', adminProductsControllers.create); /* Form to create */
router.post('/crear', upload().any(), adminProductsControllers.store); /* Store in DB */

/***  SEARCH PRODUCTS ***/
router.get('/search', adminProductsControllers.search);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:productId/editar', adminProductsControllers.edit); /* Form to create */
router.put('/:productId/editar', adminProductsControllers.update); /* Update in DB */

/*** SHOW PRODUCTs ***/ 
router.get('/:productId', adminProductsControllers.detail); /* Product detail */

/*** DELETE ONE PRODUCT ***/ 
router.delete('/:productId/eliminar', adminProductsControllers.destroy); /* Delete from DB */


module.exports = router;