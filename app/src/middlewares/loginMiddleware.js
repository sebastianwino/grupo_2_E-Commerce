let users = require('../data/usersDB.json');

function loginMiddleware(req, res, next) {



    if ((req.session.user) && (req.session.email)) {        
        users.forEach(user => {
            if (user.email == req.session.email) { 
                res.redirect('/usuarios/profile')
            } 
        })}
        
        
    
    next();

}

module.exports = loginMiddleware;