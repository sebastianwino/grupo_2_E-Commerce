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
            register: false,
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
                            res.cookie('userId', user[0].id, {
                                maxAge: 60000000
                            })
                            if (user[0].admin == true) {
                            res.cookie('admin', user[0].admin, {
                                maxAge: 60000000
                            })
                            }
                        }
                        req.session.email = user[0].email
                        req.session.user = user[0].name 
                        req.session.userId = user[0].id
                        if (user[0].admin == true) {
                        req.session.admin = user[0].admin
                        }
                        res.redirect('/')

                    }
                    res.render('users/login', {
                        title: 'Login',
                        logueo: false,
                        register: false,
                        data: req.body  
                    });

                })
                .catch(err => {
                    console.log(err)
                    res.send('Error!!!')
                })

        } else {
            res.render('users/login', {
                title: 'Login',
                logueo: false,
                register: false,
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
        res.clearCookie("userId");
        
        res.redirect('/usuarios/login')

    },

    profile: (req, res) => {

        db.User.findOne({
            include: ['address', 'phone', 'cart'],
            where: {email: req.session.email}
        })
        .then(userLoggedIn => {
            let userName = userLoggedIn.name
            let cartsSold = userLoggedIn.cart.filter(oneCart => {
                return oneCart.sold == true
            })
            res.render('users/profile', {
                title: 'Perfil',
                user: userName,
                userLoggedIn: userLoggedIn,
                addresses: userLoggedIn.address,
                phone: userLoggedIn.phone.dataValues,
                carts: cartsSold,
                admin: req.session.admin,
                cartSold: false
            })
        })
        .catch(err => {
            console.log(err)
            res.send('Error!!!')
        })

    }
}

module.exports = usersControllers;