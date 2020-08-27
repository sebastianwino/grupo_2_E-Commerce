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
            type: dataTypes.DECIMAL(10, 2),
            allownull: false
        },
        description: {
            type: dataTypes.STRING(600),
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

    let Sale = sequelize.define(alias, cols, config);

    Sale.associate = function (models) {
         Sale.belongsTo(models.User, {
             as: "user",
             foreignKey: "user_id"
         })

        Sale.hasOne(models.Address, {
            as: "address",
            foreignKey: "address_id"
        })

        Sale.belongsToMany(models.Product, {
            as: 's-products',
            through: "product_sale",
            foreignKey: "sale_id",
            otherKey: "product_id",
            timestamps: false
        })
    }


    return Sale
}