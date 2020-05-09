const Sequelize = require('sequelize')
const { loadConfig } = require('../config/config')

loadConfig()
const sequelize = new Sequelize('oNcACxFstL', 'oNcACxFstL', 'Hct8mjydD2', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})
// const sequelize = new Sequelize('mysql://oNcACxFstL:Hct8mjydD2@remotemysql.com:3306/oNcACxFstL')

module.exports = sequelize