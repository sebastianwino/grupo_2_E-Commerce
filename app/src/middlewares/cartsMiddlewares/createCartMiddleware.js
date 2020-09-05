const db = require('../../db/models')

async function cartMiddleware(req, res, next) {
    if (req.session.cartBool != true && req.session.user == undefined) {
        req.session.cartFull = false
        req.session.cartBool = true
        req.session.productsId = []

        let cart = await db.Cart.create({
            user_id: null,
            address_id: null,
            total_price: 0,
            products_total: 0,
            general_comments: '',
            sold: false
        })
        req.session.cartId = cart.dataValues.id


    } else if (req.session.user != undefined && req.session.cartFull == true && req.session.cartBool2!=true) {
      
      
        req.session.cartBool2=true

        let cart4 = await db.Cart.update({
            user_id: req.session.userId,
            // address_id: null,
            // total_price: 0,
            // products_total: 0,
            // general_comments: '0',
            sold: false
        },
            {
            where:{
                id: req.session.cartId
            }
        })

      

    } else if (req.session.user != undefined && req.session.cartFull == false && req.session.cartBool3!=true) {//levanta el carrito del user guardado  y no vendido
        
        req.session.cartBool3 = true

        let cart2 = await db.Cart.findAll({
            where: {
                user_id: req.session.userId,
                sold: false
            } 
        })  

        req.session.cartId = cart2[cart2.length-1].id

        let cart3 = await db.Cart.findAll({
            where: {
                id: req.session.cartId,
                user_id: req.session.userId,
                sold: false
            } 
        })  



      
    }



    // si tiene carrito
    // next
    // sino tiene
    // crear carrito en sesion
    // next
    next()
}

module.exports = cartMiddleware;