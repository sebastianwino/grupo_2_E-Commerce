let db = require('../../db/models');

let apiProductsController = {

   
    list: (req, res) => {

        let totalPrices = 0;
        let allProducts = db.Product.findAll();
        let products = db.Product.findAll({
            include: [
                {association: 'category'},
            ],
            offset: Number(req.query.page) * 10 || 0,
            limit: 10,
        })

        Promise.all([allProducts, products])
            .then(([allProducts, products]) => {

                products.forEach(product => {
                    product.setDataValue('endpoint', '/api/products/' + product.id);
                });

                allProducts.forEach(product => {
                    totalPrices += Number(product.price)
                });

                let respuesta = {
                    meta: {
                        status: 200,
                        page: req.query.page,
                        products_per_page: 10,
                        total_products: allProducts.length,
                        total_price: totalPrices.toFixed(2),
                        total_pages: Math.ceil(allProducts.length / 10),
                        url: "/api/products"
                    },
                    data: products
                }
                res.json(respuesta);

            })

            .catch(errors => {
                console.log(errors);
                res.send('Error!!!');
            })
               

    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [
                {association: 'category'},
            ]
        })
        .then(productDetail => {
            if (productDetail) {
                productDetail.setDataValue('endpoint', '/api/products/' + productDetail.id);

                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/products/${productDetail.id}`
                    },
                    data: productDetail
                }

                res.json(respuesta);
            } else {
                res.json('no-encontrado');
            }
        })
        .catch(errors => {
            console.log(errors);
            res.send('Error!!!');
        })

    },
    categories: (req, res) => {
    let categoryArray = [];
        db.Category.findAll({
            include: [
                {association: 'products'},
            ]
        })
        .then(categories => {
            // categories.forEach(category => {
            //     product.setDataValue('endpoint', '/api/products/categories' + product.id)
            // });
        
            categories.forEach(category => {
                categoryArray.push({
                    name: category.name,
                    products_in_category: category.products.length            
                })
            })
           
            let respuesta = {
                meta: {
                    status: 200,
                    total: categories.length,
                    url: "/api/products/categories"
                },
                data: categoryArray
            }
            
            res.json(respuesta);
        })
        .catch(errors => {
            console.log(errors);
            res.send('Error!!!');
        })
    }
}

module.exports = apiProductsController;