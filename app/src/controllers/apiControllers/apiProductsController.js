let db = require('../../db/models')

let apiProductsController = {

   
    list: (req, res) => {
        let lastProduct = 0;
        let totalPrices = 0;
        db.Product.findAll()
        .then(products => {
            
            products.forEach(product => {
                totalPrices += Number(product.price)
                product.setDataValue('endpoint', '/api/products/' + product.id)
                if(lastProduct < product.id){
                    lastProduct = product.id
                }
            });

            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    total_price: totalPrices.toFixed(2),
                    url: "/api/product",
                    last_product: lastProduct
                },
                data: products
            }

            res.json(respuesta)
        })
        .catch(errors => {
            console.log(errors)
            res.send('Error!!!')
        })

    },
    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [
                {association: 'category'},
            ]
        })
        .then(productDetail => {
            if(productDetail) {
                productDetail.setDataValue('endpoint', '/api/products/' + productDetail.id)

                let respuesta = {
                    meta: {
                        status: 200,
                        url: `/api/products/${productDetail.id}`
                    },
                    data: productDetail
                }

                res.json(respuesta)
            } else {
                res.json('no-encontrado');
            }
        })
        .catch(errors => {
            console.log(errors)
            res.send('Error!!!')
        })

    },
    categories: (req, res) => {
        db.Category.findAll()
        .then(categories => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: categories.length,
                    url: "/api/products/categories"
                },
                data: categories
            }

            res.json(respuesta)
        })
        .catch(errors => {
            console.log(errors)
            res.send('Error!!!')
        })
    }
}

module.exports = apiProductsController