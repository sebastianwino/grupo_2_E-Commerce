var express = require('express');
var router = express.Router();
const adminProductsControllers = require('../../controllers/adminControllers/adminProductsControllers');

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

router.get('/', adminProductsControllers.root); /* All products */

/*** CREATE ONE PRODUCT ***/ 
router.get('/crear', adminProductsControllers.create); /* Form to create */
router.post('/crear', upload.any(), adminProductsControllers.store); /* Store in DB */

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