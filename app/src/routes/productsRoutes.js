var express = require('express');
var router = express.Router();

const productsControllers = require('../controllers/productsControllers');
const productsFormValidations = require('../validations/productsFormValidations')

router.get('/', productsControllers.root); /*All products */

router.get('/:productId', productsControllers.detail); /*Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', productsControllers.create); /* Form to create */
router.post('/crear', productsFormValidations, productsControllers.store); /* Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/:productId/editar', productsControllers.edit); /* Form to create */
router.put('/:productId', productsControllers.update); /* Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/:productId', productsControllers.destroy); /* Delete from DB */

/*  SEARCH PRODUCTS */
router.get('/search', productsControllers.search)

module.exports = router;
