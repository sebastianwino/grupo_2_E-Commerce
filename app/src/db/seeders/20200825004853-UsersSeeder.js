'use strict';

const factory = require('../factories/usersFactory')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', factory(20), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};