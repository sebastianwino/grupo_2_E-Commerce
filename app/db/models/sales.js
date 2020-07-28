module.exports = function (sequelize,dataTypes){
    let alias = 'Sale' 

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
            type: dataTypes.DECIMAL(10,0).UNSIGNED,
            allownull: false
        },
        stock: {
            type: dataTypes.INTEGER.UNSIGNED,
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

      sale.associate = function (models){
        sale.belongsTo(models.User, {
            as: "users",
            foreignKey:"user_id"
        })
        sale.belongsToMany(models.Product,{
            as:'product_sale',
            through: "product_sale",
            foreignKey: "sale_id",
            otherKey: "product_id",
            timestamps: false
        })
     }


      return sale
} 
