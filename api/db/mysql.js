const Sequelize = require('sequelize')
const { loadConfig } = require('../config/config')

loadConfig()
const sequelizer = new Sequelize('reactapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
const sequelize = new Sequelize('mysql://root:@localhost:3306/reactapp')

module.exports = sequelize