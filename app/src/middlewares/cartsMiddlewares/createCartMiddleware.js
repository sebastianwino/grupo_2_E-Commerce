const db = require('../../db/models')

async function cartMiddleware(req, res, next) {
    if (req.session.cartBool != true && req.session.user == undefined) {

        req.session.cartBool = true
        req.session.productsId = []

        let cart = await db.Cart.create({
            user_id: null,
            address_id: null,
            total_price: 0,
            products_total: 0,
            general_comments: '0',
            sold: false
        })
        req.session.cartId = cart.dataValues.id

        // req.session.productsId.length == 0 ? console.log('Si') : console.log('No')


    } else if (req.session.user != undefined && req.session.cartFull != true) {

        let cart2 = await db.Cart.findAll({
            where: {
                user_id: req.session.userId,
                sold: false
            }
        })

        /* req.session.cartId = cart2[cart.length - 1].id */

    }



    // si tiene carrito
    // next
    // sino tiene
    // crear carrito en sesion
    // next
    next()
}

module.exports = cartMiddleware;