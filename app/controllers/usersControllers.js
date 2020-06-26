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
        res.send('Usuario registrado');
    }
}

module.exports = usersControllers;