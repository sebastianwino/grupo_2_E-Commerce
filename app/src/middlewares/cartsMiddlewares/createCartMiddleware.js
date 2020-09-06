const db = require('../../db/models')

async function cartMiddleware(req, res, next) {
    if (req.session.cartBool != true && req.session.user == undefined) { //no hay carrito creado y no hay usuario logueado

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


    } else if (req.session.user != undefined && req.session.cartFull == true && req.session.cartBool2 != true) {

        req.session.cartBool2 = true

        let cart4 = await db.Cart.update({
            user_id: req.session.userId,
            // address_id: null,
            // total_price: 0,
            // products_total: 0,
            // general_comments: '0',
            sold: false
        }, {
            where: { 
                id: req.session.cartId
            }
        })

    } else if (req.session.user != undefined && req.session.cartFull != true && req.session.cartBool3 != true) { //levanta el carrito del user guardado  y no vendido


        req.session.cartBool3 = true

        let cart2 = []
        cart2 = await db.Cart.findAll  ({
            where: {
                user_id: req.session.userId,
                sold: false
            } 
        })

        if (cart2.length > 0 && req.session.cartBool4 != true) {
            req.session.cartBool4 = true
            req.session.cartId = cart2[cart2.length-1].id 


             let cart3 = await db.Cart.findByPk(req.session.cartId,{
                 include: ['product']
             })
            req.session.productsId = [];

 
            
              cart3.product.forEach(produc=> {
                  req.session.productsId.push(produc.id)
              })

            if (Number(cart3.products_total)>0){
                req.session.cartFull = true
            } else {
                req.session.cartFull = false
            }  
            
            req.session.cartBool = true

        } else if (req.session.cartBool != true) {

            req.session.productsId = []; 
            req.session.cartFull = false
            req.session.cartBool = true
           
            let cart = await db.Cart.create({
                user_id: req.session.userId,
                address_id: null,
                total_price: 0,
                products_total: 0,
                general_comments: '',
                sold: false
            })
            req.session.cartId = cart.dataValues.id

        }
    }

    next()
}

module.exports = cartMiddleware;