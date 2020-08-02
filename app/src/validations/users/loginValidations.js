const { check, body } = require('express-validator');
const sequelize = require('sequelize')
const Op = sequelize.Op
let db = require('../../db/models')

//let users = require('../../data-json/usersDB.json');

  

let loginValidations = [
    check('email').isEmail().withMessage('Debe usar un email válido'),

    /* Corregir error */
    // body('email').custom( value => {
    //     async function theValue (value) {
    //         let users = await db.User.findAll()
        
        
        
    //          users.forEach(user => {
    //          if (value == user.email) {
    //              return false
    //          }
    //      })
    //      return true
    // }
    // }).withMessage('Usuario no registrado'),

    check('password').isLength({min: 6}).withMessage('La contraseña es incorrecta')
    

]

module.exports = loginValidations
