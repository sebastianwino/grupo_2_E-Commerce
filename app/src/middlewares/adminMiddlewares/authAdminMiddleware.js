const db = require('../../db/models');


 function authAdminMiddleware (req, res, next){
   db.User.findAll({
        where: {
            email: req.session.email,
            admin: true
        }
    })
        .then(users => {
            if(users.length != 0){
                next();
            } else {
                res.redirect('/')
            }
        })
        .catch(err =>{
            console.log(err)
            res.redirect('/')
        })
        // if(admin == 1) {
        //     next()
        // } else {
        //     res.send('no entraste')
        // }
    
}

module.exports = authAdminMiddleware