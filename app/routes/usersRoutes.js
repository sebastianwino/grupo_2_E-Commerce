var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const loginMiddleware = require('../middlewares/loginMiddleware');

/* GET users listing. */
router.get('/login', loginMiddleware ,usersControllers.login);
router.post('/login', usersControllers.processLogin);
router.post('/logout', usersControllers.processLogout);

router.get('/registro', usersControllers.register);
router.post('/registro', usersControllers.create);

module.exports = router;
