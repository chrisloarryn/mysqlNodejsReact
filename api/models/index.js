const Sequelize = require("sequelize")
const { UserModel } = require('./usuarios')
const TicketModel = require('./ticket')
const TiposModel = require('./tipoUsuario')
// const Plant = require('./plant')
// const Hub = require('./hub')
// const Camera = require('./camera')
// const Cage = require('./cage')
// const Net = require('./net')
// const Operation = require('./operation')

const { loadConfig } = require('../config/config')
loadConfig()

const sequelize = new Sequelize('mysql://root:password@localhost:3306/reactapp')

module.exports = {
    User: UserModel,
    Tipos: TiposModel,
    Ticket: TicketModel,
    // Plant: Plant(sequelize, Sequelize.DataTypes),
    // Hub: Hub(sequelize, Sequelize.DataTypes),
    // Camera: Camera(sequelize, Sequelize.DataTypes),
    // Cage: Cage(sequelize, Sequelize.DataTypes),
    // Net: Net(sequelize, Sequelize.DataTypes),
    // Operation: Operation(sequelize, Sequelize.DataTypes),
    sequelize
}