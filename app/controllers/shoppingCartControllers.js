const fs = require('fs');
const path = require('path');

let shoppingCartControllers = {
    // Root - Show all Shopping Cart
	root: (req, res) => {
        res.render('shoppingCart', {title: 'Carrito'});
    }
}

module.exports = shoppingCartControllers;