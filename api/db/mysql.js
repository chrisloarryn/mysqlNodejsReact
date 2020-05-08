const Sequelize = require('sequelize')
const { loadConfig } = require('../config/config')

loadConfig()
const sequelizer = new Sequelize('sitepoint', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
const sequelize = new Sequelize('mysql://root:password@localhost:3306/reactapp')

module.exports = sequelize