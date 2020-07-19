function carritoMiddleware (req, res, next){
    
    if((req.session.user)&&(req.session.email)){
        next();
    }
    res.render('login',{title: 'Login', user: req.session.user, logueo: true})
    
}

module.exports = carritoMiddleware;