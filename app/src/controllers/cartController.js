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
    update: async function (req, res) {

        let cart = await db.Cart.findByPk(req.session.cartId)
        let product = await db.Product.findOne({
            where: {
                id: req.body.id
            }
        })

        cart.addProduct(product, {
            through: {
                unit_price: product.price,
                qty: req.body.qty,
                sub_total_price: product.price * req.body.qty
            }
        })

        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let productsInCart = cartFull.product
        
        
        let cartTotalPrice
        let cartTotalQty
        let newQty
        let unitPrice

        productsInCart.forEach(function (productInCart) {
            if (productInCart.cart_product.product_id == req.body.id) {

                if(req.body.qty <= productInCart.cart_product.qty){
                    newQty = Number(req.body.qty) - Number(productInCart.cart_product.qty)
                    unitPrice =Number(productInCart.cart_product.unit_price)
                    cartTotalPrice = Number(cartFull.total_price) + (unitPrice*newQty)                    
                    cartTotalQty = Number(cartFull.products_total)
                }
                 else if (req.body.qty > productInCart.cart_product.qty) {
                    newQty = Number(req.body.qty) - Number(productInCart.cart_product.qty)
                    cartTotalPrice = Number(cartFull.total_price)
                    unitPrice =Number(productInCart.cart_product.unit_price)
                    cartTotalQty = Number(cartFull.products_total)
                    cartTotalPrice += (unitPrice*newQty)
                }
            }
            }
        )

        await db.Cart.update({
            user_id: req.session.userId,
            address_id: null,
            total_price: cartTotalPrice,
            products_total: cartTotalQty + newQty,
            general_comments: '',
            sold: false
        }, {
            where: {
                id: req.session.cartId
            }
        })
        res.redirect('/carrito')
    },
    destroy: async function (req, res) {

        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let productsInCart = cartFull.product
        let cartTotalPrice = cartFull.total_price
        let cartTotalQty = cartFull.products_total

        productsInCart.forEach(function (productInCart) {
            if (productInCart.cart_product.product_id == req.body.id) {
                cartTotalPrice -= Number(productInCart.cart_product.sub_total_price)
                cartTotalQty -= Number(productInCart.cart_product.qty)
            }
        })

        req.session.productsId = req.session.productsId.filter((productId => {
            return productId != req.body.id
        }))

        await db.Cart.update({
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

        await db.Cart.findByPk(req.session.cartId).then(cart => {
            cart.removeProduct(req.body.id)
        })


        res.redirect('/carrito')
    }
}

module.exports = cartController;