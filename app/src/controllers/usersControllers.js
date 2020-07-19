const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDB.json'); 

let users = JSON.parse(fs.readFileSync(usersFilePath,  {encoding: 'utf-8'}));

let usersControllers = {
    login: (req, res) => {
        res.render('users/login', {title: 'Login'});
    },
    processLogin: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            users.forEach(user => {

                /* Decidir que validación se deja (express-validator, la siguiente o ambas) */
                if (user.email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        res.send(`Bienvenido, ${user.name}!!!`);
                    }
                }
            })    
        } else {
            res.render('users/login', {title: 'Login', errors: errors.errors});
        }
             
        

        
    },
    register: (req, res) => {
        res.render('users/register', {title: 'Registrate'});
    },
    create: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {

            let passwordEncripted = bcrypt.hashSync(req.body.password, 10)
            let newUser = {
                id: users[users.length-1].id+1,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: passwordEncripted
                /* address: req.body.address,
                addressNumber: req.body.addressNumber,
                city: req.body.city,
                phoneNumber: req.body.phoneNumber */
            };

            users.push(newUser);

            let usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersFilePath, usersJSON);

            res.send('Usuario registrado');

        } else {
            res.render('users/register', {title: 'Registrate', errors: errors.errors});
        }

        
    }
}

module.exports = usersControllers;