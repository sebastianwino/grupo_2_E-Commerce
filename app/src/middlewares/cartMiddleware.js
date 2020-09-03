const db = require('../db/models')

function cartMiddleware (req, res, next) {
    req.session.cartBool;
    if (req.session.cartBool != true) {
        req.session.cartBool = true
        db.Cart.create({
            user_id: null,
            address_id: null,
            total_price: 0,
            products_total: 0,
            general_comments: '0'
        })
    }  
    
    next();

    // si tiene carrito
        // next
    // sino tiene
        // crear carrito en sesion
        // next
}

module.exports = cartMiddleware;