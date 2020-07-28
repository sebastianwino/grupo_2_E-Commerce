module.exports = function (sequelize, dataTypes) {
    let alias = 'product_sale'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false

        },
        qty: {
            type: dataTypes.DECIMAL(10, 0).UNSIGNED,
            allownull: false
        },
        sub_total: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        }
    }

    let config = {
        tableName: 'product_sale',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let product_sale = sequelize.define(alias, cols, config);




    return product_sale
}