const bcrypt = require('bcrypt');
const {
    validationResult
} = require('express-validator');
let db = require('../db/models')

let usersController = {
    register: (req, res) => {

        res.render('users/register', {
            title: 'Registrate',
            user: req.session.user,
            admin: req.session.admin,
            data: {
                name: null,
                lastname: null,
                email: null
            },
            admin: req.session.admin,
        });
    },
    addAddress: (req,res) => {
        res.render('users/addAddressForm', {
            title: 'Agregue un direccion',
            user: req.session.user,
            data: {
                alias: null,
                city: null,
                prov: null,
                street: null,
                number: null,
                floor: null,
                departament: null,
                zip_code: null,
                admin: req.session.admin,
            }
        });
    },
    storeAddress: async function(req, res) {


        let errors = validationResult(req)

        if (errors.isEmpty()) {
            await db.Address.create({
                alias: req.body.alias,
                city: req.body.city,
                prov: req.body.prov,
                street: req.body.street,
                number: req.body.number,
                floor: req.body.floor,
                departament: req.body.departament,
                zip_code: req.body.zip_code,
                user_id: req.session.userId
            })

        

        } else {
            res.render('users/addAddressForm', {
                title: 'Agregue un direccion',
                user: req.session.user,
                data: {
                    alias: null,
                    city: null,
                    prov: null,
                    street: null,
                    number: null,
                    floor: null,
                    departament: null,
                    zip_code: null,
                    errors: errors.errors,
                    admin: req.session.admin,
                }
            });
        }
        
        
        
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
                    cell_phone_2: null,
                    phone: null

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
                },
                admin: req.session.admin,
            });
        } else {
            res.render('users/register', {
                title: 'Registrate',
                errors: errors.errors,
                data: req.body
            });
        }
    },
    /* edit: (req, res) => {
        res.render('users/editUser', {
            title: 'Editar perfil',
            user: req.session.user,
            data: {
                name: null,
                lastname: null,

            }
        });
    }, */
    update: async function (req, res) {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            // phone: {
            //     cell_phone: req.body.cell_phone,
            //     cell_phone_2: req.body.phone,
            //     phone: req.body.cell_phone_2,
            // }
            
            req.body.cell_phone_2 == 0 ? req.body.cell_phone_2 = null : req.body.cell_phone_2
           req.body.phone == 0 ? req.body.phone = null : req.body.phone




            await db.Phone.update({
                cell_phone: req.body.cell_phone,
                cell_phone_2: req.body.cell_phone_2,
                phone: req.body.phone,
            }, {
                where: {
                    id: req.body.phone_id
                }
            })

            await db.User.update({
                name: req.body.name,
                last_name: req.body.lastname,
                phone_id: req.body.phone_id,
            }, {
                where: {
                    id: req.session.userId
                }
            })

            res.redirect(`/usuarios/perfil`)

        } else {

            db.User.findOne({
                    include: ['address', 'phone'],
                    where: {
                        email: req.session.email
                    }
                })
                .then(userLoggedIn => {
                    let userName = userLoggedIn.name
                    res.render('users/profile', {
                        title: 'Perfil',
                        user: userName,
                        userLoggedIn: userLoggedIn,
                        address: userLoggedIn.address[0],
                        phone: userLoggedIn.phone.dataValues,
                        admin: req.session.admin,
                        errors: errors.errors
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send('Error!!!')
                })
        }
    }
}

module.exports = usersController;