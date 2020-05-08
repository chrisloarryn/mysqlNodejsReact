"use strict";

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  var UserModel = sequelize.define('usuarios', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    idTipouser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_tipouser'
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'nombre'
    },
    mail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'mail'
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'pass'
    }
  }, {
    tableName: 'usuarios'
  });
  return UserModel;
};