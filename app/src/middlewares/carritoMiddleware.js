function carritoMiddleware (req, res, next){

    // Revisar si se puede llenar el carrito, sin estar logueado

    if((req.session.user)&&(req.session.email)){
        next();
    }
    res.render('users/login', {title: 'Login', user: req.session.user, logueo: true});
    
    next();
}

module.exports = carritoMiddleware;