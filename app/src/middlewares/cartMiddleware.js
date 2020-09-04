const db = require('../db/models')

 function cartMiddleware(req, res, next) {

    if (req.session.cartBool != true && req.session.user == undefined) {

        let cartI
    
        let probando;
        db.Cart.create({
                user_id: null,
                address_id: null,
                total_price: 0,
                products_total: 0,
                general_comments: '0',
                sold: false
            })
            .then(cart => {
                probando = cart.dataValues.id
            })
            .then(() => {
                req.session.cartId = probando
                req.session.cartBool = true

            })
            .then(()=>{
                next()
            })
        }
 
    // } else if (req.session.user != undefined && req.session.cartFull != true) {

    //     db.Cart.findAll({
    //             where: {
    //                 user_id: req.session.userId,
    //                 sold: false
    //             }
    //         })
    //         .then(carts => {
    //             req.session.cartId = carts[carts.length - 1].id
    //         })
    // }

    // next();

    // si tiene carrito
    // next
    // sino tiene
    // crear carrito en sesion
    // next
    next()
}

module.exports = cartMiddleware;