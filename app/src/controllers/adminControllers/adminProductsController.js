const sharp = require('sharp');
const {
    unlink
} = require('fs-extra');
const db = require('../../db/models');
const search = require('../../Fx/search')
const sequelize = require('sequelize')
const { validationResult } = require('express-validator');
const path = require('path')

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
        // tambien se podria filtrar por where dentro de findAll
        res.render('products/admin/adminProducts', { 
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
            return res.render('products/admin/adminProductDetail', {
                title: product.title,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user,
                admin: req.session.admin
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
                    admin: req.session.admin,
                    data: {
                        name: null,
                        description: null,
                        slices: null,
                        category_id: null,
                        price: null,
                        stock: null
                    }
                });
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })
        
    },

    // Create -  Method to store
    store: (req, res, next) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let ruta = path.join('.', 'public', 'images', 'upload', req.files[0].filename)
            let modificado = path.join('.', 'public', 'images', 'upload', 'm' + req.files[0].filename)
            sharp(ruta)
                .resize(1920, 1080)
                .toFile(modificado)

            let rutaB = path.join('.', 'public', 'images', 'upload', req.files[1].filename)
            let modificadoB = path.join('.', 'public', 'images', 'upload', 'm' + req.files[1].filename)
            sharp(rutaB)
                .resize(1920, 1080)
                .toFile(modificadoB)

            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                image_1: 'm' + req.files[0].filename,
                image_2: 'm' + req.files[1].filename
            })

            res.redirect(`/admin/productos`)

        } else {
            db.Category.findAll()
            .then(categories => {
                res.render('products/admin/createProduct', {
                    title: 'Crear Producto',
                    categories: categories,
                    user: req.session.user,
                    user: req.session.user,
                    admin: req.session.admin,
                    errors: errors.errors,
                    data: req.body
                });
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })
        }
    },

    // Update - Form to edit
    edit: (req, res) => {

        let productEdit = db.Product.findByPk(req.params.productId, {
            include: ['category']
        })
        let categoriesEdit = db.Category.findAll()

        Promise.all([productEdit, categoriesEdit])
            .then(([product, categories]) => {
                if (product) {
                    return res.render('products/admin/editProduct', {
                        title: `Editar Producto ${product.name}`,
                        product: product,
                        categories: categories,
                        user: req.session.user,
                        admin: req.session.admin
                    });
                } else {
                    res.send('no entro')
                }
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })
    },

    // Update - Method to update
    update: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            db.Product.update({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock
            }, {
                where:{
                    id:req.params.productId
                }
            })

            res.redirect(`/admin/productos`)
            
        } else {
            let productEdit = db.Product.findByPk(req.params.productId, {
                include: ['category']
            })
            let categoriesEdit = db.Category.findAll()
    
            Promise.all([productEdit, categoriesEdit])
                .then(([product, categories]) => {
                    if (product) {
                        return res.render('products/admin/editProduct', {
                            title: `Editar Producto ${product.name}`,
                            product: product,
                            categories: categories,
                            user: req.session.user,
                            admin: req.session.admin,
                            errors: errors.errors,
                            // data: req.body // ver como pasarle los campos a la vista, pisando los campos value originales del producto a editar
                        });
                    } else {
                        res.send('no entro')
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.send('Error!!!')
                })
        }
    },

    // Delete - Delete one product from DB
    destroy: async function (req, res) {


        let product = await db.Product.findByPk(req.params.productId)
            
                unlink('./public/images/upload/' + product.image_1, function (err) {
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
           
           
                db.Product.destroy({
                    where: {
                        id: req.params.productId
                    }
                })
            
            res.redirect('/admin/productos')
    },

    search: async function (req, res) {
        let admin = 'admin'
        search(req, res, admin);

        
    //     let cant = 0;
    //     let productsFound = [];
    //     let word = req.query.search;
    //     word = word.toLocaleLowerCase();
    //     products.forEach(product => {
    //         let title = product.title.toLocaleLowerCase();
    //         let category = product.category.toLocaleLowerCase();
    //         if ((title.indexOf(word) != -1) || (category.indexOf(word) != -1)) {
    //             productsFound.push(product);
    //             cant++;
    //         }
    //     });




    //     res.render('products/products', {
    //         products: productsFound,
    //         title: 'Productos',
    //         categories: categories,
    //         word: word,
    //         cant: cant,
    //         user: req.session.user,
    //         admin: req.session.admin
    //     })
    // }
    }
}

module.exports = productsControllers;