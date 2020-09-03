module.exports = function (sequelize, dataTypes) {
    let alias = 'cart_product'

    let cols = {
        unit_price: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        qty: {
            type: dataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false
        },
        sub_total_price: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
    }

    let config = {
        tableName: 'cart_product',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let cart_product = sequelize.define(alias, cols, config);

    return cart_product
}