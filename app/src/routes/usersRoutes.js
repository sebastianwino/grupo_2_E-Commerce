var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/usersControllers');

const loginValidations = require('../validations/users/loginValidations')
const registerValidations = require('../validations/users/registerValidations')

/* GET users listing. */
router.get('/login', usersControllers.login);
router.post('/login', loginValidations, usersControllers.processLogin);

router.get('/registro', usersControllers.register);
router.post('/registro', registerValidations, usersControllers.create);

module.exports = router;
