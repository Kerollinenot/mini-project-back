const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("Groups", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        title: {
             type: Sequelize.STRING(50)
        },
        description: {
            type: Sequelize.TEXT
       },
    }, {
        timestamps: false,
        tableName: 'groups'
    });
}