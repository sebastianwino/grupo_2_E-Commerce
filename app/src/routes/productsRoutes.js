var express = require('express');
var router = express.Router();
const productsControllers = require('../controllers/productsControllers');
const edicionProductosMiddleware = require('../middlewares/edicionProductosMiddleware');
const edicionMiddleware = require ('../middlewares/edicionMiddleware')
const authEditMiddleware = require ('../middlewares/authEditMiddleware')
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


router.get('/', edicionProductosMiddleware, productsControllers.root); /* All products */

router.get('/detalle/:productId', edicionMiddleware ,productsControllers.detail); /* Product detail */
router.get('/detalle/:productId/img',edicionMiddleware, productsControllers.detailImg); /* Product detail */
/*** CREATE ONE PRODUCT ***/ 
router.get('/crear',authEditMiddleware, productsControllers.create); /* Form to create */
router.post('/crear',[authEditMiddleware, upload.any()], productsControllers.store); /* Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/editar/:productId',authEditMiddleware, productsControllers.edit); /* Form to create */
router.put('/editar/:productId', authEditMiddleware, productsControllers.update); /* Update in DB */

/*** DELETE ONE PRODUCT ***/ 
router.delete('/eliminar/:productId', productsControllers.destroy); /* Delete from DB */

/***  SEARCH PRODUCTS ***/
router.get('/search', productsControllers.search);


module.exports = router;