var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/usersControllers');

/* GET users listing. */
router.get('/login', usersControllers.login);
router.post('/login', usersControllers.processLogin);

router.get('/registro', usersControllers.register);
router.post('/registro', usersControllers.create);

module.exports = router;
