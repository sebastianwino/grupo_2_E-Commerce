module.exports = function (sequelize,dataTypes){
    let alias = 'Address' 

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        }, 
        street: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        city: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        prov: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        alias: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        number: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        },
        zip_code: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        }
    }

    let config = {
        tableName: 'addresses',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let Address = sequelize.define(alias, cols, config);

    Address.associate = function (models){
        Address.belongsTo(models.User, {
            as: "user",
            foreignKey:"user_id"
        })
        Address.belongsTo(models.Sale, {
            as: "sale",
            foreignKey: "address_id"
        })
    }

    return Address
} 
