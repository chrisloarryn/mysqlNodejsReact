"use strict";

/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
  var TiposModel = sequelize.define('tipoUsuario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'nombre'
    }
  }, {
    tableName: 'tipo_usuario'
  });
  return TiposModel;
};