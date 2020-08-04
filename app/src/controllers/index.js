let controllers = {
    index: require('./indexController'),
    user: require('./usersController'),
    userAuth: require('./usersAuthController'),
    products: require('./productsControllers'),
    shoppingCart: require('./shoppingCartControllers'),
    admin: require('./adminControllers')
}

module.exports = controllers