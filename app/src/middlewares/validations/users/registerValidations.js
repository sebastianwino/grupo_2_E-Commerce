const { check, body } = require('express-validator');
let db = require('../../../db/models')



let registerValidations = [
    
    check('name').isLength({min: 1}).withMessage('Debés escribir tu nombre'),
    check('lastname').isLength({min: 1}).withMessage('Debés escribir tu apellido'),
    check('email').isEmail().withMessage('Debe usar un email válido'),

    body('email').custom(value => {
        return db.User.findAll({
            where: {
                email: value
            }
        })
            .then(user => {
                if (user[0]) {
                return Promise.reject('Ya existe una cuenta con este email');
                }
            });
    }),

    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('passwordConfirmation').custom( (value, {req}) => {
        if (value !== req.body.password) {
            return false;
          }
          return true;
    }).withMessage('Las contraseñas no coinciden'),
]

module.exports = registerValidations
