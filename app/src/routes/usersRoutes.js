var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const loginMiddleware = require('../middlewares/loginMiddleware');

const loginValidations = require('../validations/users/loginValidations')
const registerValidations = require('../validations/users/registerValidations')

/* GET users listing. */
router.get('/login', loginMiddleware ,usersControllers.login);
router.post('/login', loginValidations, usersControllers.processLogin);
router.post('/logout', usersControllers.processLogout);

router.get('/registro', usersControllers.register);
router.post('/registro', registerValidations, usersControllers.create);


module.exports = router;
