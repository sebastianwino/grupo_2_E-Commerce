const fs = require('fs');
const path = require('path')
const productObject = require ('./createProduct')
const shoppingFilePath = path.join(__dirname, '../../data-json/Shopping.json'); 
let shopping = JSON.parse(fs.readFileSync(shoppingFilePath,  {encoding: 'utf-8'}));


module.exports = function (req,res,find,productFound) {
    if (find == false) {
       productObject(req,res)
        } else {
            productFound = productFound.filter (element => {
                return element.id!=req.body.id})

        productObject(req,res)
    }

    productFound.push(productObject(req,res))

    let shopping1 = JSON.stringify(productFound, null, 4);
    fs.writeFileSync(shoppingFilePath , shopping1);
    res.redirect('/carrito')
}
