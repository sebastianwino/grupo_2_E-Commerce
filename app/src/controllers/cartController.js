const db = require('../db/models/');

let cartController = {
    // Root - Show all Shopping Cart
    root: async function (req, res) {

        let cart = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })

        let products = cart.product

        res.render('shoppingCart', {
            title: 'Carrito',
            admin: req.session.admin,
            cart: cart,
            products: products,
            user: req.session.user
        })
        //  res.json(asociation)
        //     res.render('shoppingCart', {
        //         title: 'Carrito',
        //         admin: req.session.admin,
        //         cart: cart3
        //     });
    },
    store: async function (req, res) {

        let cart = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let product = await db.Product.findByPk(req.body.id)
  
        // let flag = false;
        
            //     if(req.session.prId != undefined){
            //     req.session.prId.forEach(element => {
            //         if(element != product.id){
            //             flag = true;
            //         }
            //     });
            // }

        // if (!flag){
        // req.session.prId = []
        // }
        // if(flag){
        // req.session.prId.push(product.id);
        // }

        let flag = true;
        
        req.session.productsId.forEach(productId => {
            if (productId == req.body.id) {
                flag = false;
            }
        })
 
        if(flag) {
            req.session.productsId.push(req.body.id)
        }


        console.log(Number(req.body.qty))
        console.log(Number(req.session.qty))

        cart.addProduct(product.id, {
            through: {
                unit_price: Number(product.price),
                qty: Number(req.body.qty) + Number(req.session.qty),
                sub_total_price: Number(product.price) * (Number(req.body.qty) + Number(req.session.qty))
            }
        })

       // req.session.qty = 0;
        //req.session.prPrice = 0;

        res.json(cart)

        res.send('Comprado')

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
        db.Cart.findByPk(req.body.id).then(cart => {
            cart.removeProduct()
        })
    }
}

module.exports = cartController;