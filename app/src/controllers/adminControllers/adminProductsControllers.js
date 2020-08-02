const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {
    unlink
} = require('fs-extra');
const db = require('../../db/models');

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
        res.render('products/admin/adminProducts', { 
            title: 'Productos',
            products: pruebaProductos,
            categories: categoriesAll,
            filter: filter,
            filterPriceMin: priceMin,
            filterPriceMax: priceMax,
            user: req.session.user
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
            return res.render('products/admin/adminProductDetail', {
                title: product.title,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user,
                img: 'img1'
            });
        }
        res.redirect('/no-encontrado');
    },

    // Create - Form to create
    create: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                res.render('products/admin/createProduct', {
                title: 'Crear Producto',
                categories: categories,
                user: req.session.user,
                user: req.session.user
                });
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })
        
    },

    // Create -  Method to store
    store: (req, res, next) => {

        let ruta = path.join('.', 'public', 'images', 'upload', req.files[0].filename)
        let modificado = path.join('.', 'public', 'images', 'upload', 'm' + req.files[0].filename)
        sharp(ruta)
            .resize(600, 400)
            .toFile(modificado)

        let rutaB = path.join('.', 'public', 'images', 'upload', req.files[1].filename)
        let modificadoB = path.join('.', 'public', 'images', 'upload', 'm' + req.files[1].filename)
        sharp(rutaB)
            .resize(600, 400)
            .toFile(modificadoB)

        let newProduct = {
            id: products[products.length - 1].id + 1,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            slices: req.body.slices,
            stock: req.body.stock,
            imageLg: 'm' + req.files[0].filename,
            image: 'm' + req.files[1].filename
        }

        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4))

        res.redirect(`detalle/${newProduct.id}`)

    },

    // Update - Form to edit
    edit: (req, res) => {

        let productEdit = db.Product.findByPk(req.params.id, {
            include: [{association: 'category'}]
        })
        let categoriesEdit = db.Category.findAll()

        Promise.all([productEdit, categoriesEdit])
            .then(([product, categories]) =>{
                if (product) {
                    return res.render('products/admin/editProduct', {
                        title: `Editar Producto ${productToEdit.title}`,
                        product: productToEdit,
                        categories: categories,
                        user: req.session.user
                    });
                } else {
                    res.redirect('/no-encontrado');
                }
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })


        // JSON
        // let idProduct = req.params.productId;
        // let productToEdit = products.find(product => {
        //     if (product.id == idProduct) {
        //         return product;
        //     }
        // });

        // if (productToEdit) {
        //     return res.render('products/admin/editProduct', {
        //         title: `Editar Producto ${productToEdit.title}`,
        //         product: productToEdit,
        //         categories: categories,
        //         user: req.session.user
        //     });
        // }
        // res.redirect('/no-encontrado');
    },

    // Update - Method to update
    update: (req, res) => {
        let idProduct
        let productEdited = products.map(product => {
            if (product.id == req.params.productId) {
                return {
                    ...product,
                    ...req.body
                }
            }
            return product
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(productEdited))

        res.redirect(`/admin/productos/`)

    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {


        db.Product.findByPk(req.params.id)
            .then(product => {
                unlink('./public/images/upload/' + product.imageLg, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('archivo borrado');
                });


                unlink('./public/images/upload/' + product.image, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('archivo borrado');
                });
                return ' '
            })
            .then(resultado => {
                db.Product.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            })

    },

    search: (req, res) => {
        let cant = 0;
        let productsFound = [];
        let word = req.query.search;
        word = word.toLocaleLowerCase();
        products.forEach(product => {
            let title = product.title.toLocaleLowerCase();
            let category = product.category.toLocaleLowerCase();
            if ((title.indexOf(word) != -1) || (category.indexOf(word) != -1)) {
                productsFound.push(product);
                cant++;
            }
        });




        res.render('products/products', {
            products: productsFound,
            title: 'Productos',
            categories: categories,
            word: word,
            cant: cant,
            user: req.session.user
        })
    }
}

module.exports = productsControllers;