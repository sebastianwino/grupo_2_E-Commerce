function cookieMiddleware (req, res, next) {
    if ((req.cookies.recordame)&&(req.cookies.usuario)&&(req.session.user == undefined)&&(req.session.email == undefined)) {
        req.session.user = req.cookies.usuario;
        req.session.email = req.cookies.recordame;
        if ((req.cookies.admin)&&(req.session.admin == undefined))
        req.session.admin = req.cookies.admin;
    }
    
    next();
}

module.exports = cookieMiddleware;