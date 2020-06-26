var express = require('express');
var router = express.Router();
const productsControllers = require('../controllers/productsControllers');

router.get('/', productsControllers.root); /*All products */

router.get('/detalle/:productId', productsControllers.detail) /*Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear/', productsControllers.create); /* Form to create */
router.post('/crear/', productsControllers.store); /* Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/editar/:productId', productsControllers.edit); /* Form to create */
router.put('/editar/:productId', productsControllers.update); /* Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/eliminar/:productId', productsControllers.destroy); /* Delete from DB */

module.exports = router;
