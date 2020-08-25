'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('products', 'image_3', {
                type: Sequelize.STRING(100),
                allowNull: true
            });
            await queryInterface.addColumn('products', 'image_4', {
                type: Sequelize.STRING(100),
                allowNull: true
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn('products', 'image_3');
            await queryInterface.removeColumn('products', 'image_4');
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }
};