const { check } = require('express-validator');

let editProfileValidations = [
    
    check('name').isLength({min: 1}).withMessage('Debés escribir tu nombre'),
    check('lastname').isLength({min: 1}).withMessage('Debés escribir tu apellido'),

]

module.exports = editProfileValidations
