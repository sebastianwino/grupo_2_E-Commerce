function cookieMiddleware (req, res, next){
    
    if((req.cookies.recordame)&&(req.cookies.usuario)&&(req.session.user == undefined)&&(req.session.email == undefined)){
        req.session.user = req.cookies.usuario;
        req.session.email = req.cookies.recordame;
    }

    
    next();
}

module.exports = cookieMiddleware;