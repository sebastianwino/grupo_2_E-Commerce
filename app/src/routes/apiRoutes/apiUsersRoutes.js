var express = require('express');
var router = express.Router();

const apiControllers = require('../../controllers/apiControllers')

router.get('/', apiControllers.users.list);

router.get('/:id', apiControllers.users.detail);


module.exports = router