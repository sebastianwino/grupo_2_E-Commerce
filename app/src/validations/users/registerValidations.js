const { check, body } = require('express-validator');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../../data/usersDB.json'); 
let users = JSON.parse(fs.readFileSync(usersFilePath,  {encoding: 'utf-8'}));

let registerValidations = [
    
    check('name').isLength({min: 1}).withMessage('Debés escribir tu nombre'),
    check('lastname').isLength({min: 1}).withMessage('Debés escribir tu apellido'),
    check('email').isEmail().withMessage('Debe usar un email válido'),

    /* ----- Error en esta validación ----- */
    body('email').custom( value => {
        users.forEach(user => {
            if (user.email == value) {
                return false
            }
        })
        return true
    }).withMessage('Usuario ya registrado'),
    /* ------------------------------------- */

    check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('passwordConfirmation').custom( (value, {req}) => {
        if (value !== req.body.password) {
            return false;
          }
          return true;
    }).withMessage('Las contraseñas no coinciden'),
]

module.exports = registerValidations