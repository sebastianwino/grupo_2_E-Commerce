const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
let db = require('../db/models')

let usersController = {
    register: (req, res) => {
        
        res.render('users/register', {
            title: 'Registrate',
            user: req.session.user,
            data: {
                name: null,
                lastname: null,
                email: null
            }
        });
    },

    store: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            let passwordEncripted = bcrypt.hashSync(req.body.password, 10)

            db.User.create({
                name: req.body.name,
                last_name: req.body.lastname,
                email: req.body.email,
                password: passwordEncripted,
                admin: false,
                phone: {
                    cell_phone: req.body.cell_phone,
                    phone: null,
                    cell_phone_2: null
                }
            }, {
                include: ['phone']
            })
            
            res.render('users/login', {
                title: 'Login',
                user: req.session.user,
                logueo: false,
                data: {
                    email: req.body.email
                }
            });
        } else {
            res.render('users/register', {
                title: 'Registrate',
                errors: errors.errors,
                data: req.body
            });
        }
    }
}

module.exports = usersController;