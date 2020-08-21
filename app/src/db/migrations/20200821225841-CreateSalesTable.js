'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sales', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'users',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            address_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'addresses',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            total: {
                type: Sequelize.DECIMAL(10, 0),
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(600),
                allowNull: true
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
        return queryInterface.dropTable('sales');
    }
};