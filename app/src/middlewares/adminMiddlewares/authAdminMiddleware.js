const db = require('../../db/models');

function authAdminMiddleware (req,res,next){
    /* db.User.findAll()
        .then(users => {
        
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
        }) */
    
    next();
}

module.exports = authAdminMiddleware