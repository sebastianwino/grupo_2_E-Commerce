const fs = require('fs');
const path = require('path');

const shoppingFilePath = path.join(__dirname, '../data/Shopping.json'); 
let shopping = JSON.parse(fs.readFileSync(shoppingFilePath,  {encoding: 'utf-8'}));


let shoppingCartControllers = {
    // Root - Show all Shopping Cart
	root: (req, res) => {

        res.render('shoppingCart', {
            title: 'Carrito',
            shopping:shopping
        });
    },
    
    previousPurchase: (req, res) => {
        
        let productFount = shopping;
        let find = false
        let product = {}
        let sum = 0;
        shopping.forEach(element => {
            if (element.id==req.body.id){
                find = true;
                sum = element.cant;
        }});



        if (find == false){
        let price = parseInt(req.body.price);
        let cant = parseInt(req.body.cant);
        let total = price * cant;
        total = total.toString();
         product = {
            id: req.body.id,
            cant: req.body.cant, 
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            slices: req.body.slices,
            stock: req.body.stock,
            imageLg: req.body.imageLg,
            image: req.body.image,
            total: total
            }
        } else if (find == true){
        
            productFount = productFount.filter (element => {
                return element.id!=req.body.id})

        let price = parseInt(req.body.price);
        let cant = parseInt(req.body.cant);
        sum = parseInt(sum);
        sum = sum + cant;
        sum = sum.toString()
        let total = price * cant;
        total = total.toString();
        product = {
            id: req.body.id,
            cant: sum, 
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            slices: req.body.slices,
            stock: req.body.stock,
            imageLg: req.body.imageLg,
            image: req.body.image,
            total: total
        }
    }

        
        productFount.push(product)


       

        let shopping1 = JSON.stringify(productFount, null, 4);
        fs.writeFileSync(shoppingFilePath , shopping1);
        res.redirect('/carrito')
    },

    distroy: (req,res) => {
        let productFount = shopping;
        
            productFount = productFount.filter (element => {
            return element.id!=req.body.id})

        let shopping1 = JSON.stringify(productFount, null, 4);
        fs.writeFileSync(shoppingFilePath , shopping1);
        res.redirect('/carrito')
    }
}

module.exports = shoppingCartControllers;