let db = require('../../db/models')

let apiProductsController = {

   
    list: (req, res) => {
        db.Product.findAll()
        .then(products => {
            products.forEach(product => {
                product.setDataValue('endpoint', '/api/products/' + product.id)
            });

            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/product"
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

    }
}

module.exports = apiProductsController