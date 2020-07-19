let users = require('../data/usersDB.json');

function loginMiddleware(req, res, next) {



    if ((req.session.user) && (req.session.email)) {        
        users.forEach(user => {
            if (user.email == req.session.email) { 
                let userComplete = user
                res.render('profile', {
                    title: 'Profile',
                    user: req.session.user,
                    userComplete: userComplete
                })
            } 
        })}
        
        
    
    next();

}

module.exports = loginMiddleware;