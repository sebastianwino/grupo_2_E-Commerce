const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let categories = ["facturas", "tortas", "salado", "especialidades", "galletitas"]

let productsControllers = {
    // Root - Show all products
	root: (req, res) => {
        let filter = req.query.filter;
        let pruebaProductos = [];
        let priceMin = req.query.filterPriceMin;
        
        


        let priceMax = req.query.filterPriceMax;
       
       
  
            pruebaProductos = products.filter(product => {
            return product.id <= 30})
       
        if (filter != undefined) {
            pruebaProductos = products.filter(product => {
                return product.category == filter;
            })  
        } if ((priceMin != undefined)&&(priceMax != undefined)) {
        pruebaProductos = products.filter(product => {
            return (product.price >= priceMin)&&(product.price <= priceMax);
        })  
        } 
        

        console.log(priceMin)
        console.log(priceMax)

        res.render('products', {
            title: 'Productos',
            products: pruebaProductos,
            categories: categories,
            filter: filter,
            filterPriceMin:priceMin,
            filterPriceMax:priceMax,
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

        if (product) {
            let productsRelated = products.filter(productRelated => {
                if (productRelated.category == product.category && productRelated.price <= (product.price * 1.3) && productRelated.price >= (product.price * 0.7 ) && productRelated != product) {
                    return productRelated;
                };
            });
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
            let newProduct = {
            id: products[products.length-1].id+1,
            ...req.body,
        }
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products))

        res.redirect(`detalle/${newProduct.id}`)

    },

	// Update - Form to edit
	edit: (req, res) => {
        let idProduct = req.params.productId;
        let productToEdit = products.find(product => {
            if (product.id == idProduct) {
                return product;
            }
        });

        if (productToEdit) {
            return res.render('editProduct', {
                title: `Editar Producto ${productToEdit.title}`,
                product: productToEdit,
                categories: categories
            });
        }
        res.redirect('/no-encontrado');
    },

	// Update - Method to update
	update: (req, res) => {
        let productEdited = products.map(product => {
            if (product.id == req.params.productId) {
                return {...product, ...req.body}
            }
            return product
        })

        fs.writeFileSync(productsFilePath, JSON.stringify(productEdited))

		res.redirect(`/productos/`)

    },
    
	// Delete - Delete one product from DB
	destroy : (req, res) => {
        let productDeleted = products.filter(product => {
            return product.id != req.params.productId
            })

        fs.writeFileSync(productsFilePath, JSON.stringify(productDeleted))

        res.redirect('/productos')
    }
}

module.exports = productsControllers;