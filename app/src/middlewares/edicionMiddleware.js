async function edicionMiddleware (req, res, next){
    
 
    if ((req.session.user) && (req.session.email)) {  
        let user = await db.User.findOne({
            where:{
                email: req.session.email
            }
        })
        if(user.admin){
            let productsAll = await db.Product.findAll({include:['category']})
            let product = await db.Product.findByPk(req.params.productId,{
                include: ['category']
            })  

            if (product) {
                let productsRelated = productsAll.filter(productRelated => {
                    if (productRelated.category == product.category && productRelated.price <= (product.price * 1.3) && 
                    productRelated.price >= (product.price * 0.7 ) && productRelated != product) {
                        return productRelated;
                    };
                });
                return res.render('products/productDetail', {
                    title: product.title,
                    product: product,
                    productsRelated: productsRelated,
                    user: req.session.user,
                    img: 'img1'
                });
            }
            res.redirect('/no-encontrado');
        }
        
    }       
    next();
}

module.exports = edicionMiddleware