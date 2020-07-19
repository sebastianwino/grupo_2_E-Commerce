let users = require('../data/usersDB.json');

const products = require('../data/productsDB.json')

function edicionMiddleware (req,res,next){
    
    if ((req.session.user) && (req.session.email)) {        
        users.forEach(user => {
            if (user.email == req.session.email) { 
                if(user.privilege == 'admin'){
                    let idProduct = req.params.productId;
        let product = products.find(product => {
            if (product.id == idProduct) {
                return product;
            }
        });   

        if (product) {
            let productsRelated = products.filter(productRelated => {
                if (productRelated.category == product.category && productRelated.price <= (product.price * 1.3) && productRelated.price >= (product.price * 0.7 ) && productRelated != product) {
                    return productRelated;
                };
            });
            return res.render('productEdit', {
                title: product.title,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user, user: req.session.user
            });
        }
        res.redirect('/no-encontrado');
    

            }
        }
    })}
        
           
    next();
}

module.exports = edicionMiddleware