const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let categories = ["facturas", "tortas", "salado", "especialidades", "galletitas"]

let productsControllers = {
    // Root - Show all products
	root: (req, res) => {
        let pruebaProductos = products.filter(product => {
            return product.id <= 30
        })
        
        res.render('products', {
            title: 'Productos',
            products: pruebaProductos,
            categories: categories
        });
    },

    // Detail - Show one product
    detail: (req, res) => {
        let idProduct = req.params.productId;
        let product = products.find(product => {
            if (product.id == idProduct) {
                return product;
            }
        });
        let productsRelated = products.filter(productRelated => {
            if (productRelated.category = product.category && productRelated.stock > 250) {
                return productRelated;
            };
        });
        console.log(productsRelated);
        if (product) {
            return res.render('productDetail', {
                title: product.title,
                product: product,
                productsRelated: productsRelated
            });
        }
        res.redirect('/no-encontrado');
        },

    // Create - Form to create
	create: (req, res) => {
        res.render('createProduct', {
            title: 'Crear Producto',
            categories: categories
        });
	},
	
	// Create -  Method to store
	store: (req, res) => {
        res.send('Producto creado');
    },

	// Update - Form to edit
	edit: (req, res) => {
        res.render('editProduct', {title: 'Editar Producto'});

    },

	// Update - Method to update
	update: (req, res) => {
        res.send('Producto editado');

    },
    
	// Delete - Delete one product from DB
	destroy : (req, res) => {
        res.send('Producto eliminado');
    }
}

module.exports = productsControllers;