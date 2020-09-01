const fs = require('fs');
const path = require('path');
const findObject = require('../Fx/shopping/find')
const productObject = require ('../Fx/shopping/createProduct')

const shoppingFilePath = path.join(__dirname, '../data-json/Shopping.json'); 
let shopping = JSON.parse(fs.readFileSync(shoppingFilePath,  {encoding: 'utf-8'}));


let shoppingCartControllers = {
    // Root - Show all Shopping Cart
	root: (req, res) => {
        let total = 0;
        let acc = 0;
        shopping.forEach (element => {
            acc = parseFloat(element.total)
            total = total + acc;
        })
        
        total = total.toFixed(2)
        
        res.render('shoppingCart', {
            title: 'Carrito',
            shopping:shopping,
            total: total, user: req.session.user,
            admin: req.session.admin
        });
    },
    
    previousPurchase: (req, res) => {
        
        let productFound = shopping;
        let find = false
        
        
        shopping.forEach(element => {
            if (element.id==req.body.id) {
                find = true;
                sum = element.cant;
        }});



        findObject(req,res,find,productFound)

    
    },

    destroy: (req,res) => {
        let productFount = shopping;
        
            productFount = productFount.filter (element => {
            return element.id!=req.body.id})

        let shopping1 = JSON.stringify(productFount, null, 4);
        fs.writeFileSync(shoppingFilePath , shopping1);
        res.redirect('/carrito')
    },

    modification: (req, res) => {
        console.log(req.body)
        

        let productFount = shopping;
        productFount = productFount.filter (element => {
            return element.id!=req.body.id})    


    productFount.push(productObject(req,res))
    let shopping1 = JSON.stringify(productFount, null, 4);
    fs.writeFileSync(shoppingFilePath , shopping1);
    res.redirect('/carrito')

        
    }
}

module.exports = shoppingCartControllers;