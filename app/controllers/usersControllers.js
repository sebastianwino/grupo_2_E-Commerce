const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDB.json'); 

let users = JSON.parse(fs.readFileSync(usersFilePath,  {encoding: 'utf-8'}));

let usersControllers = {
    login: (req, res) => {
        res.render('login', {title: 'Login'});
    },
    processLogin: (req, res) => {
        res.send('Usuario logeado');
    },
    register: (req, res) => {
        res.render('register', {title: 'Registrate'});
    },
    create: (req, res) => {
        let usuario = {
            id: users[users.length-1].id+1,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            addressNumber: req.body.addressNumber,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber
        };

        users.push(usuario);

        let usersJSON = JSON.stringify(users, null, 4);
        fs.writeFileSync(usersFilePath, usersJSON);

        res.send('Usuario registrado');
    }
}

module.exports = usersControllers;