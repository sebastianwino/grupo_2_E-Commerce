const db = require('../db/models');
const sequelize = require ('sequelize');
const search = require('../Fx/search')

// const productsFilePath = path.join(__dirname, '../data-json/productsDB.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//let categories = ["facturas", "tortas", "salado", "especialidades", "galletitas"]


let productsControllers = {
    // Root - Show all products
    root: async function (req, res) {
        let productsAll = await db.Product.findAll({
            include: ['category']
        })
        let categoriesAll = await db.Category.findAll()

        let filter = req.query.filter;


        let pruebaProductos = [];
        let priceMin = req.query.filterPriceMin;
        let priceMax = req.query.filterPriceMax;

        pruebaProductos = productsAll.filter(product => {
            return product.id <= 30
        })


        if (filter != undefined) {
            pruebaProductos = productsAll.filter(product => {
                return product.category.name == filter;
            })
        }
        if ((priceMin != undefined) && (priceMax != undefined)) {
            pruebaProductos = productsAll.filter(product => {
                return (product.price >= priceMin) && (product.price <= priceMax);
            })
        }
        //   tambien se podria filtrar por where dentro de findAll
        res.render('products/products', {
            title: 'Productos',
            products: pruebaProductos,
            categories: categoriesAll,
            filter: filter,
            filterPriceMin: priceMin,
            filterPriceMax: priceMax,
            user: req.session.user,
            admin: req.session.admin
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
                if (productRelated.category.name == product.category.name && productRelated.price <= (product.price * 1.3) &&
                    productRelated.price >= (product.price * 0.7) && productRelated != product) {
                    return productRelated;
                };
            });
            return res.render('products/productDetail', {
                title: product.title,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user,
                admin: req.session.admin
            });
        }
        res.redirect('/no-encontrado');
    },
    search: async function (req,res) {
        let x = 'x'
        search(req,res, x);
    }
}

module.exports = productsControllers;