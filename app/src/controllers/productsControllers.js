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


        res.render('products/products', {
            title: 'Productos',
            products: pruebaProductos,
            categories: categories,
            filter: filter,
            filterPriceMin:priceMin,
            filterPriceMax:priceMax,
            user: req.session.user
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
            return res.render('products/productDetail', {
                title: product.title,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user, user: req.session.user
            });
        }
        res.redirect('/no-encontrado');
    },

    // Create - Form to create
	create: (req, res) => {
        res.render('products/createProduct', {
            title: 'Crear Producto',
            categories: categories,
            user: req.session.user, user: req.session.user
        });
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
            let newProduct = {
            id: products[products.length-1].id+1,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            category: req.body.categories,
            slices: req.body.slices,
            stock: req.body.stock,
            imageLg: req.files[0].filename,
            image: req.files[1].filename
        }

        
        products.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4))

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
            return res.render('products/editProduct', {
                title: `Editar Producto ${productToEdit.title}`,
                product: productToEdit,
                categories: categories, user: req.session.user
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
    },

    search : (req, res) => {
    let cant = 0;
    let productsFound = [];
    let word = req.query.search;
    word = word.toLocaleLowerCase();
    products.forEach(product => {
        let title = product.title.toLocaleLowerCase();
        let category = product.category.toLocaleLowerCase();
        if ((title.indexOf(word)!=-1)||(category.indexOf(word)!=-1)){
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