module.exports = function (sequelize, dataTypes) {
    let alias = 'Product'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        description: {
            type: dataTypes.STRING(600),
            allownull: false
        },
        name: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        },
        price: {
            type: dataTypes.DECIMAL(10, 0).UNSIGNED,
            allownull: false
        },
        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        },
        slice: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: true
        }
    }

    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let product = sequelize.define(alias, cols, config);

    product.associate = function (models) {
        product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "category_id"
        })
        product.belongsToMany(models.Sale, {
            as: 'product_sale',
            through: "product_sale",
            foreignKey: "product_id",
            otherKey: "sale_id",
            timestamps: false
        })
    }


    return product
}