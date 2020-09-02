const db = require('../db/models');
let path = require('path');
const search = require('../Fx/search');

function paginate(req, result, productsLimit, url) {
    let baseURL = url
    let limit = productsLimit

    return {
        firstPage: baseURL,
        nextPage: baseURL + (req.query.page ? Number(req.query.page) + 1 : 1),
        prevPage: baseURL + (req.query.page > 0 ? Number(req.query.page) - 1 : 0),
        lastPage: baseURL + (parseInt(result.count / limit) - 1)
    }
}

let productsControllers = {
    // Root - Show all products
    root: async function (req, res) {
        let productsAll = await db.Product.findAndCountAll({
            offset: Number(req.query.page) * 18 || 0,
            limit: 12,
            include: ['category'],
        })
        let products = productsAll.rows
        let categoriesAll = await db.Category.findAll()

        let filter = req.query.filter;
        let priceMin = req.query.filterPriceMin;
        let priceMax = req.query.filterPriceMax;

        if (filter != undefined) {
            products = products.filter(product => {
                return product.category.name == filter;
            })
        }
        if ((priceMin != undefined) && (priceMax != undefined)) {
            products = products.filter(product => {
                return (product.price >= priceMin) && (product.price <= priceMax);
            })
        }

        //  tambien se podria filtrar por where dentro de findAll

        res.render('products/products', {
            title: 'Productos',
            products: products,
            categories: categoriesAll,
            filter: filter,
            filterPriceMin: priceMin,
            filterPriceMax: priceMax,
            user: req.session.user,
            admin: req.session.admin,
            pagination: paginate(req, productsAll, 6, `/productos?page=`)
        });
    },
    detail: async function (req, res) {

        let productsAll = await db.Product.findAll({
            include: ['category']
        })
        let product = await db.Product.findByPk(req.params.productId, {
            include: ['category']
        })

        if (product) {
            let productsRelated = productsAll.filter(productRelated => {
                if (productRelated.category.name == product.category.name && productRelated.price <= (product.price * 1.5) &&
                    productRelated.price >= (product.price * 0.7) && productRelated != product) {
                    return productRelated;
                };
            });
            return res.render('products/productDetail', {
                title: product.name,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user,
                admin: req.session.admin
            });
        }
        res.redirect('/no-encontrado');
    },
    search: async function (req, res) {
        let x = 'x'
        search(req, res, x);
    },
    showImage: (req, res) => {

        // let filename = req.path.split('/').pop()
        // return res.sendFile(path.resolve('uploads',filename))


        db.Product.findByPk(req.params.productId)
            .then(product => {
                let image = product.image_1
                res.sendFile(path.join(__dirname, '../../public/images/upload', image))
            })
            .catch(errors => {
                console.log(errors);
                res.send('Error!!!');
            })
    }
}

module.exports = productsControllers;