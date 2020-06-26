const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let productsControllers = {
    // Root - Show all products
	root: (req, res) => {
        res.render('products', {title: 'Productos'});
    },

    // Detail - Show one product
    detail: (req, res) => {
        res.render('productDetail', {title: 'Detalle de Producto'});

    },

    // Create - Form to create
	create: (req, res) => {
        res.render('createProduct', {title: 'Crear Producto'});
	},
	
	// Create -  Method to store
	store: (req, res) => {
        res.send('Producto creado')
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