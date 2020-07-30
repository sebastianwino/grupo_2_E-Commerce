module.exports = function (sequelize,dataTypes){
    let alias = 'Category' 

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
        }
    }

    let config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
      }

      let category = sequelize.define(alias, cols, config);

      category.associate = function (models){
        category.hasMany(models.Product, {
            as: "categories",
            foreignKey:"category_id"
        })
     }


      return category
} 
