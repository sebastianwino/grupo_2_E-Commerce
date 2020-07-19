const { check, body } = require('express-validator');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../../data/usersDB.json'); 
let users = JSON.parse(fs.readFileSync(usersFilePath,  {encoding: 'utf-8'}));

let loginValidations = [
    check('email').isEmail().withMessage('Debe usar un email válido'),
    check('password').isLength({min: 6}).withMessage('La contraseña es incorrecta')
]

module.exports = loginValidations