var express = require('express');
var router = express.Router();

const controllers = require('../controllers')

/* MIDDLEWARES */
const loginRegisterMiddleware = require('../middlewares/loginRegisterMiddleware');
const profileMiddleware = require('../middlewares/profileMiddleware');

/* FORM VALIDATIONS */
const loginValidations = require('../middlewares/validations/users/loginValidations')
const registerValidations = require('../middlewares/validations/users/registerValidations')

/* AUTH */
router.get('/login', loginRegisterMiddleware, controllers.userAuth.loginForm);
router.get('/perfil', profileMiddleware, controllers.userAuth.profile);
router.post('/login', loginValidations, controllers.userAuth.login);
router.post('/logout', controllers.userAuth.logout);

/* REGISTRATION */
router.get('/registro', loginRegisterMiddleware, controllers.user.register);
router.post('/registro', registerValidations, controllers.user.store);


module.exports = router;
