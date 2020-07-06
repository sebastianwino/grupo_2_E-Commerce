const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const usersFilePath = path.join(__dirname, '../data/usersDB.json'); 

let users = JSON.parse(fs.readFileSync(usersFilePath,  {encoding: 'utf-8'}));

let usersControllers = {
    login: (req, res) => {
        res.render('login', {title: 'Login'});
    },
    processLogin: (req, res) => {
     
        users.forEach(user => {
            if (user.email == req.body.email) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send(`Bienvenido, ${user.name}!!!`);
                }
            }
        })
        res.send('Usuario no existente, registrate!!!');

        
    },
    register: (req, res) => {
        res.render('register', {title: 'Registrate'});
    },
    create: (req, res) => {
        let passwordEncripted = bcrypt.hashSync(req.body.password, 10)
        let newUser = {
            id: users[users.length-1].id+1,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: passwordEncripted,
            address: req.body.address,
            addressNumber: req.body.addressNumber,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber
        };

        users.push(newUser);

        let usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJSON);

        res.send('Usuario registrado');
    }
}

module.exports = usersControllers;