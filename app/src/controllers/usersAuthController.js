const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const sequelize = require('sequelize')
let db = require('../db/models')

let usersControllers = {
    loginForm: (req, res) => {

        res.render('users/login', {
            title: 'Login',
            user: req.session.user,
            logueo: true,
            data: {
                email: null
            }
        });
    },

    login: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            db.User.findAll({
                where: {
                    email: req.body.email
                }
            })

                .then(user => {
                    if (bcrypt.compareSync(req.body.password, user[0].password)) {
                        if (req.body.remember == 'yes') {
                            res.cookie('recordame', user[0].email, {
                                maxAge: 60000000
                            })
                            res.cookie('usuario', user[0].name, {
                                maxAge: 60000000
                            })
                            if(user[0].admin == true){
                            res.cookie('admin', user[0].admin, {
                                maxAge: 60000000
                            })
                            }
                        }
                        req.session.email = user[0].email
                        req.session.user = user[0].name
                        if(user[0].admin == true){
                        req.session.admin = user[0].admin
                        }
                        res.redirect('/')

                    }
                    res.render('users/login', {
                        title: 'Login',
                        logueo: false,
                        data: req.body
                    });

                })
                .catch(er => {
                    res.send('error')
                })

        } else {
            res.render('users/login', {
                title: 'Login',
                logueo: true,
                errors: errors.errors,
                data: req.body
            });
        }
    },

    logout: (req, res) => {
        req.session.destroy();

        res.clearCookie("recordame");
        res.clearCookie("usuario");
        res.clearCookie("admin");
        

        res.redirect('/usuarios/login')

    },

    profile: (req, res) => {

        db.User.findAll({
            where: {
                email: req.session.email
            }
        }).then(userComplete => {
            res.render('users/profile', {
                title: 'Perfil',
                user: req.session.user,
                userComplete: userComplete[0],
                admin: req.session.admin
            })
        })

    }
}

module.exports = usersControllers;