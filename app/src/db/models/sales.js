module.exports = function (sequelize, dataTypes) {
    let alias = 'Sale'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        total: {
            type: dataTypes.dataTypes.DECIMAL(10, 0),
            allownull: false
        },
        sale_date: {
            type: dataTypes.DATE,
            allownull: false
        }
    }

    let config = {
        tableName: 'sales',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let sale = sequelize.define(alias, cols, config);

    sale.associate = function (models) {
        sale.belongsTo(models.User, {
            as: "s_users",
            foreignKey: "user_id"
        })
        sale.belongsToMany(models.Product, {
            as: 'product_sale',
            through: "product_sale",
            foreignKey: "sale_id",
            otherKey: "product_id",
            timestamps: false
        })
    }


    return sale
}