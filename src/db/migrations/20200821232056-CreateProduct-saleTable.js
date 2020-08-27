'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product_sale', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'products',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            qty: {
                type: Sequelize.DECIMAL(10, 0).UNSIGNED,
                allowNull: false
            },
            sub_total: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            sale_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'sales',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('product_sale');
    }
};