const fs = require('fs');
const path = require('path');


let users = require('../data-json/usersDB.json');
const productsFilePath = path.join(__dirname, '../data-json/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let categories = ["facturas", "tortas", "salado", "especialidades", "galletitas"]


function  edicionProductosMiddleware (req,res,next){
    let filter = req.query.filter;
        let pruebaProductos = [];
        let priceMin = req.query.filterPriceMin;
        let priceMax = req.query.filterPriceMax;
        
        pruebaProductos = products.filter(product => {
            return product.id <= 30
        })
       
        if (filter != undefined) {
            pruebaProductos = products.filter(product => {
                return product.category == filter;
            })  
        } if ((priceMin != undefined)&&(priceMax != undefined)) {
        pruebaProductos = products.filter(product => {
            return (product.price >= priceMin)&&(product.price <= priceMax);
        })  
    } 

    if ((req.session.user) && (req.session.email)) {        
        users.forEach(user => {
            if (user.email == req.session.email) { 
                if(user.privilege == 'admin'){
                    res.render('products/createProducts', {
                        title: 'Productos',
                        products: pruebaProductos,
                        categories: categories,
                        filter: filter,
                        filterPriceMin:priceMin,
                        filterPriceMax:priceMax,
                        user: req.session.user
                    })
                }
            }
        })
    }
        
           
    next();

}

module.exports = edicionProductosMiddleware;
