let users = require('../data/usersDB.json');

const products = require('../data/productsDB.json')

function authEditMiddleware (req,res,next){
    
    if ((req.session.user) && (req.session.email)) {        
        users.forEach(user => {
            if (user.email == req.session.email) { 
                if(user.privilege == 'admin'){
                    next();
                }
            }
        })
    }
    res.redirect('/')
}

module.exports = authEditMiddleware