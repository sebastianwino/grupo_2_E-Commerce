var express = require('express');
var router = express.Router();
const adminProductsControllers = require('../../controllers/adminControllers/adminProductsControllers');

const authAdminMiddleware = require ('../../middlewares/adminMiddlewares/authAdminMiddleware');
const edicionProductosMiddleware = require('../../middlewares/edicionProductosMiddleware');
const edicionMiddleware = require ('../../middlewares/edicionMiddleware');


const multer = require('multer')
const path = require('path')
express.static(path.join(__dirname, 'public'))


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage });


router.get('/', authAdminMiddleware, /* edicionProductosMiddleware, */ adminProductsControllers.root); /* All products */

router.get('/:productId', authAdminMiddleware, /* edicionMiddleware, */ adminProductsControllers.detail); /* Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', authAdminMiddleware, adminProductsControllers.create); /* Form to create */
router.post('/crear', [authAdminMiddleware, upload.any()], adminProductsControllers.store); /* Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/:productId/editar', authAdminMiddleware, adminProductsControllers.edit); /* Form to create */
router.put('/:productId/editar', authAdminMiddleware, adminProductsControllers.update); /* Update in DB */

/*** DELETE ONE PRODUCT ***/ 
router.delete('/:productId/eliminar', authAdminMiddleware, adminProductsControllers.destroy); /* Delete from DB */

/***  SEARCH PRODUCTS ***/
router.get('/search', adminProductsControllers.search);


module.exports = router;