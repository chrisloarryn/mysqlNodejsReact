"use strict";

var Sequelize = require("sequelize");

var UserModel = require('./usuario');

var TicketModel = require('./ticket');

var TiposModel = require('./tipoUsuario'); // const Plant = require('./plant')
// const Hub = require('./hub')
// const Camera = require('./camera')
// const Cage = require('./cage')
// const Net = require('./net')
// const Operation = require('./operation')


var _require = require('../config/config'),
    loadConfig = _require.loadConfig;

loadConfig();
var sequelize = new Sequelize('mysql://root:password@localhost:3306/reactapp');
module.exports = {
  User: UserModel(sequelize, Sequelize.DataTypes),
  Tipos: TiposModel(sequelize, Sequelize.DataTypes),
  Ticket: TicketModel(sequelize, Sequelize.DataTypes),
  // Plant: Plant(sequelize, Sequelize.DataTypes),
  // Hub: Hub(sequelize, Sequelize.DataTypes),
  // Camera: Camera(sequelize, Sequelize.DataTypes),
  // Cage: Cage(sequelize, Sequelize.DataTypes),
  // Net: Net(sequelize, Sequelize.DataTypes),
  // Operation: Operation(sequelize, Sequelize.DataTypes),
  sequelize: sequelize
};