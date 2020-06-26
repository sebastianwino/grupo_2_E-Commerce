const fs = require('fs');
const path = require('path')

let indexControllers = {
    root: (req, res) => {
        res.render('home', {title: 'Home'});
    }
}

module.exports = indexControllers;