const db = require('../db/models/');

let cartController = {
    // Root - Show all Shopping Cart
    root: async function (req, res) {

        let cart = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })


        res.render('shoppingCart', {
            title: 'Carrito',
            admin: req.session.admin,
            cart: cart,
            products: cart.product,
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



        let flag = true;

        req.session.productsId.forEach(productId => {
            if (productId == req.body.id) {
                flag = false;
            }
        })

        if (flag) {
            req.session.productsId.push(req.body.id)
        }


        // console.log(Number(req.body.qty))
        // console.log(Number(req.session.qty))

        await cart.addProduct(product.id, {
            through: {
                unit_price: Number(product.price),
                qty: Number(req.body.qty) + Number(req.session.qty),
                sub_total_price: Number(product.price) * (Number(req.body.qty) + Number(req.session.qty))
            }
        })

        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let productsInCart = cartFull.product
        let cartTotalPrice = 0
        let cartTotalQty = 0

        productsInCart.forEach(function (productInCart) {
            cartTotalPrice += Number(productInCart.cart_product.sub_total_price)
            cartTotalQty += Number(productInCart.cart_product.qty)
        })


        console.log('precio          ' + cartTotalPrice)
        console.log('precio          ' + cartTotalPrice)
        console.log('precio          ' + cartTotalPrice)
        console.log('precio          ' + cartTotalPrice)
        console.log(cartTotalQty)
        console.log(cartTotalQty)
        console.log(cartTotalQty)
        console.log(cartTotalQty)




        let cart4 = await db.Cart.update({
            user_id: req.session.userId,
            address_id: null,
            total_price: cartTotalPrice,
            products_total: cartTotalQty,
            general_comments: '',
            sold: false
        }, {
            where: {
                id: req.session.cartId
            }
        })



        req.session.cartFull = true

        res.redirect('/carrito')

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
    destroy: async function (req, res)  {
        await db.Cart.findByPk(req.session.cartId).then(cart => {
            cart.removeProduct(req.body.id)
        })
        
        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let productsInCart = cartFull.product
        let cartTotalPrice = 0
        let cartTotalQty = 0
 
        productsInCart.forEach(function (productInCart) {
            cartTotalPrice += Number(productInCart.cart_product.sub_total_price)
            cartTotalQty += Number(productInCart.cart_product.qty)
        })

      
        let hola = await db.Cart.update({
            user_id: req.session.userId,
            address_id: null,
            total_price: cartTotalPrice,
            products_total: cartTotalQty,
            general_comments: '',
            sold: false
        }, {
            where: {
                id: req.session.cartId
            }
        })

      
        res.redirect('/carrito')
    }
}

module.exports = cartController;