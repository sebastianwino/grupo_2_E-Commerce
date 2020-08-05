let controllers = {
    main: require('./mainController'),
    user: require('./usersController'),
    userAuth: require('./usersAuthController'),
    products: require('./productsController'),
    shoppingCart: require('./shoppingCartController'),
    admin: require('./adminControllers')
}

module.exports = controllers