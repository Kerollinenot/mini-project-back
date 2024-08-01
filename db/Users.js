const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("Users", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true
        },
        login: {
             type: Sequelize.STRING(30)
        },
        password: {
            type: Sequelize.STRING(30)
       },
       username: {
           type: Sequelize.STRING(50)
       },
       token: {
           type: Sequelize.STRING(50)
       },
    }, {
        timestamps: false,
        tableName: 'users'
    });
}