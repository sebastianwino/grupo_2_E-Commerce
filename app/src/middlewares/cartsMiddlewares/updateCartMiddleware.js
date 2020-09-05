const db = require('../../db/models')

async function updateCartMiddleware(req, res, next) {

    let cart = await db.Cart.findByPk(req.session.cartId, {
        include: ['product']
    })
    //let product = await db.Product.findByPk(req.body.id)

    let flag = false;
    let prodQty
    let prodPrice
    
  


    if(req.session.productsId.length > 0){
        req.session.productsId.forEach(element => {
            if (element == req.body.id) {
                flag = true;
            }
        })
    } 

    if (flag) {
        cart.product.forEach(prod => {
            if (prod.id == req.body.id) {
                prodQty = prod.cart_product.qty
                prodPrice = prod.price
            }
        })


        console.log(prodPrice)
        console.log(prodQty)
        console.log(prodQty)
        console.log(prodQty)
        console.log(prodQty)
        console.log(prodQty)
        console.log(prodQty)


        req.session.prPrice = Number(prodPrice);
        req.session.qty = Number(prodQty);
 
        //req.session.cartId = Number(req.session.cartId) + 1
         console.log('console log del middleware'+ (prodQty))
         console.log('console log del middleware'+ (prodQty))
         console.log('console log del middleware'+ (prodQty))
         console.log('console log del middleware'+ (prodQty))
         console.log('console log del middleware'+ (prodQty))
        cart.removeProduct(Number(req.body.id))

    } else {
        req.session.prPrice = 0;
        req.session.qty = 0;
    }

    next()
}

module.exports = updateCartMiddleware;