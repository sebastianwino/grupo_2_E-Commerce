function cartMiddleware (req, res, next) {
    
    if (req.session.carritobo == undefined) {
        req.session.cart = {}
    }  

    next();

    // si tiene carrito
        // next
    // sino tiene
        // crear carrito en sesion
        // next
}

module.exports = cartMiddleware;