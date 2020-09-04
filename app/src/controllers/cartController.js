const db = require('../db/models/');

let cartController = {
    // Root - Show all Shopping Cart
    root: async function (req, res) {


        let cart = await db.Cart.findByPk(req.session.cartId)
        res.json(cart)
        // let product = await db.Product.findOne({
        //     where: 
        //     {cart.id:}
        // })

        // let asociation = await cart.getProduct(product.id, {
        //                                                 through: {
        //                                                     price: product.price,
        //                                                     total_price: product.price * req.body.qty
        //                                                 }
        //                                             })



        //  res.json(asociation)
        //     res.render('shoppingCart', {
        //         title: 'Carrito',
        //         admin: req.session.admin,
        //         cart: cart3
        //     });
    },
    store: async function (req, res) {
              
        let cart = await db.Cart.findByPk(req.session.cartId)
        let product = await db.Product.findByPk(req.body.id)

        cart.addProduct(product.id, {through: {
                    unit_price: product.price,
                    qty: req.body.qty,
                    sub_total_price: product.price * req.body.qty
                }})
        
        res.send('Comprado')

        /* let cart = await db.Cart.findByPk(req.session.cartId)
        let product = await db.Product.findOne({
            where: {
                id: req.body.id
            }
        })

        cart.addProduct(product.id) , {
            through: {
                unit_price: product.price,
                qty: req.body.qty,
                sub_total_price: product.price * req.body.qty
            }
        } 

        res.send('Comprado') */

    },
    update: (req, res) => {
        req.session.cartFull = true
        db.Cart.findByPk(req.session.cart)
            .then(cart => {
                db.Product.findByPK(req.body.product_id)
                    .then(product => {
                        cart.setProduct(product, {
                            through: { //puede ser set o add
                                price: product.price,
                                total_price: product.price * req.body.qty
                            }
                        })
                    })
            })
    },
    destroy: (req, res) => {
        db.Cart.findByPk().then(cart => {
            cart.removeProduct()
        })
    }
}

module.exports = cartController;