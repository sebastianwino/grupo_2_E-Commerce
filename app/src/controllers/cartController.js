const db = require('../db/models/');
const { cart } = require('.');

let cartController = {
    // Root - Show all Shopping Cart
	root: function (req, res) {
        
        
            res.send(req.session.cartId)    
            console.log(req.session.cartId)
        // })


        // res.json()
        //     res.render('shoppingCart', {
        //         title: 'Carrito',
        //         shopping:shopping,
        //         admin: req.session.admin,

        //     });
    },
    store: (req,res) => {
        db.Cart.findByPk(req.session.cart)
        .then(cart => {
            db.Product.findByPK(req.body.product_id)
            .then(product => {
                cart.addProduct(product, {through: {
                    price: product.price,
                    total_price: product.price * req.body.qty
                }})
            })
        })
    },    
    update: (req, res) => {
        db.Cart.findByPk()
        .then(cart => {
            db.Product.findByPK(req.body.product_id)
            .then(product => {
                cart.setProduct(product, {through: { //puede ser set o add
                    price: product.price,
                    total_price: product.price * req.body.qty
                }})
            })
        })
    },
    destroy: (req,res) => {
      db.Cart.findByPk().then(cart =>{
          cart.removeProduct()
        })
    }
}

module.exports = cartController;
