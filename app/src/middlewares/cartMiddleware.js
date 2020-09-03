const db = require('../db/models')

function cartMiddleware (req, res, next) {
    if (req.session.cartBool != true && req.session.user == undefined) {

        req.session.cartBool = true
        
        db.Cart.create({
            user_id: null,
            address_id: null,
            total_price: 0,
            products_total: 0,
            general_comments: '0'
            })
            .then(cart=>{
                req.session.cartId = cart.dataValues.id
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