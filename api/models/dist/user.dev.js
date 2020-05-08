'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserModel = sequelize.define('User', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_tipouser: {
      type: DataTypes.STRING,
      allowNull: false
    } // auth_token: DataTypes.STRING(1250),
    // rol: DataTypes.STRING

  }, {});

  UserModel.associate = function (models) {// associations can be defined here
  }; // User.associate = function(models) {
  //     User.hasMany(models.Plant, {
  //         foreignKey: 'user_id',
  //         as: 'plants'
  //     })
  // }


  return UserModel;
};