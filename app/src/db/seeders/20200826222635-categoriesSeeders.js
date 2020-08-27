'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {

        let categories = [{
                name: 'Dulce'
            }, {
                name: 'Salado'
            }, {
                name: 'Tortas'
            }, {
                name: 'Facturas'
            }, {
                name: 'Desayunos'
            }, {
                name: 'Masas Secas'
            }
        ]

        return queryInterface.bulkInsert('categories', categories, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};