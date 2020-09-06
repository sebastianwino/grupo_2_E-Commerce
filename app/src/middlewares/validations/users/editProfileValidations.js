const { check} = require('express-validator');
let db = require('../../../db/models')

let editProfileValidations = [
    
    check('name').isLength({min: 2}).withMessage('Debés escribir tu nombre'),
    check('lastname').isLength({min: 2}).withMessage('Debés escribir tu apellido'),
    check('cell_phone').isNumeric({min: 8, max: 15}).withMessage('Debés escribir un teléfono válido')
    
]

module.exports = editProfileValidations
