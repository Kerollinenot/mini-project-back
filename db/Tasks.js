const Sequelize = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define("Tasks", {
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
        group_id: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM(15)
        }
    }, {
        timestamps: false,
        tableName: 'tasks'
    });
}