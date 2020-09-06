var express = require('express');
var router = express.Router();

const controllers = require('../controllers')

/* MIDDLEWARES */
const loginRegisterMiddleware = require('../middlewares/loginRegisterMiddleware');
const profileMiddleware = require('../middlewares/profileMiddleware');

/* FORM VALIDATIONS */
const loginValidations = require('../middlewares/validations/users/loginValidations')
const registerValidations = require('../middlewares/validations/users/registerValidations')
const editProfileValidations = require('../middlewares/validations/users/editProfileValidations')
const addressValidations = require('../middlewares/validations/users/addressValidations')

/* AUTH */
router.get('/login', loginRegisterMiddleware, controllers.userAuth.loginForm);
router.get('/perfil', profileMiddleware, controllers.userAuth.profile);
router.post('/login', loginValidations, controllers.userAuth.login);
router.get('/logout', controllers.userAuth.logout);

/* REGISTRATION */
router.get('/registro', loginRegisterMiddleware, controllers.user.register);
router.post('/registro', registerValidations, controllers.user.store);

/* ADDRESSES */
router.get('/perfil/direcciones', profileMiddleware, controllers.user.addAddress);
router.post('/perfil/direcciones', addressValidations, controllers.user.storeAddress);
// router.put('/perfil/direcciones',profileMiddleware, controllers.user.editAddress);
// router.delete('/perfil/direcciones', controllers.user.deleteAddress);

/* EDIT */
/* router.get('/perfil/editar', controllers.user.edit); */
router.put('/perfil/editar', editProfileValidations, controllers.user.update);


module.exports = router;