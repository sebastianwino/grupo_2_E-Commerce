const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const sequelize = require('sequelize')
const Op = sequelize.Op
let db = require('../db/models')


//const usersFilePath = path.join(__dirname, '../data-json/usersDB.json'); 

//let users = JSON.parse(fs.readFileSync(usersFilePath,  {encoding: 'utf-8'}));

let usersControllers = {
    login: (req, res) => {

        res.render('users/login', {
            title: 'Login',
            user: req.session.user,
            logueo:true,
            data: {email: null}
        });
    },

    profile:  (req, res) => {
            
            // users.forEach(user => {
            //     if (user.email == req.session.email) { 
            //         let userComplete = user
            //         res.render('users/profile', {
            //             title: 'Profile',
            //             user: req.session.user,
            //             userComplete: userComplete
            //         })
            //     } 
            // })
        db.User.findAll({
            where:{
                email: req.session.email
            }
        }).then(userComplete => {
            res.render('users/profile', {
            title: 'Profile',
            user: req.session.user,
            userComplete: userComplete[0]
          })
        })
            
     },

    processLogin: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            // users.forEach(user => {
            //     if (user.email == req.body.email) {

                db.User.findAll({
                    where:{email: req.body.email}
                }).then(user=>{
                   // if (bcrypt.compareSync(req.body.password, user.password)) {
                                     if(req.body.password == user[0].password){
                                         if (req.body.remember == 'yes') {
                                         res.cookie('recordame', user[0].email, {maxAge: 60000000})
                                         res.cookie('usuario', user[0].name, {maxAge: 60000000})
                                         }
                                         req.session.email = user[0].email
                                         req.session.user = user[0].name
                                         res.redirect('/')
                                     }
                                     res.render('users/login', {title: 'Login', logueo: false, data: req.body});
                                   
                           
                        
                }).catch(er=>{res.send('error')})

            } else {
                res.render('users/login', {title: 'Login', logueo:true, errors: errors.errors, data: req.body});
            }
        //         }).then(user=>{
        //             // if (bcrypt.compareSync(req.body.password, user.password)) {
        //             if(req.body.password == user.password){
        //                 if (req.body.remember == 'yes') {
        //                 res.cookie('recordame', user.email, {maxAge: 60000000})
        //                 res.cookie('usuario', user.name, {maxAge: 60000000})
        //                 }
        //                 req.session.email = user.email
        //                 req.session.user = user.name
        //                 res.redirect('/')
        //             }
        //             res.render('users/login', {title: 'Login', logueo: false, data: req.body});
        //           })
           
        // } else {
        //     res.render('users/login', {title: 'Login', logueo:true, errors: errors.errors, data: req.body});
        // }
    

            // }   
               
    },
    processLogout: (req,res)=>{
        req.session.destroy();
        
        res.clearCookie("recordame");
        res.clearCookie("usuario");

        
        res.redirect('/')

    },


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
    create: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            
            let passwordEncripted = bcrypt.hashSync(req.body.password, 10)

            db.Users.create({
                name: req.body.name,
                last_name: req.body.lastname,
                email: req.body.email,
                password: passwordEncripted,
                phone: req.body.phone
            })


            // JSON
            // let newUser = {
            //     id: users[users.length-1].id+1,
            //     name: req.body.name,
            //     lastname: req.body.lastname,
            //     email: req.body.email,
            //     password: passwordEncripted,
            //     /* address: req.body.address,
            //     addressNumber: req.body.addressNumber,
            //     city: req.body.city,
            //     phoneNumber: req.body.phone, */
            //     privilege: 'client'
            // };

            // users.push(newUser);

            // let usersJSON = JSON.stringify(users, null, 4);
            // fs.writeFileSync(usersFilePath, usersJSON);

            res.render('users/login', {
                title: 'Login',
                user: req.session.user,
                logueo: false,
                data: {email: req.body.email}
            });
        } else {
            res.render('users/register', {title: 'Registrate', errors: errors.errors, data: req.body});
        }
    }
}

module.exports = usersControllers;