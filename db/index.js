const Sequelize = require('sequelize');

const sequelize = new Sequelize("mini-project", "root", "", {
    dialect: "mysql",
    host: "localhost",
    logging: false //- вывод SQL запроса
})

const Tasks = require('./Tasks')(sequelize);
const Groups = require('./Groups')(sequelize);
const Users = require('./Users')(sequelize);

module.exports = {
    sequelize: sequelize,
    tasks: Tasks,
    groups: Groups,
    users: Users
}