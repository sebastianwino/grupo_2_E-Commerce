const { check, body } = require('express-validator');

let users = require('../../data-json/usersDB.json');

let loginValidations = [
    check('email').isEmail().withMessage('Debe usar un email válido'),

    /* Corregir error */
    body('email').custom( value => {
        users.forEach(user => {
            if (value == user.email) {
                return false
            }
        })
        return true
    }).withMessage('Usuario no registrado'),

    check('password').isLength({min: 6}).withMessage('La contraseña es incorrecta')
    

]

module.exports = loginValidations
