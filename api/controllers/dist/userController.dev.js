"use strict";

//const User = require('./../models/userModel')
var _require = require('./../models/index'),
    UserModel = _require.UserModel;

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var factory = require('./handlerFactory');

var filterObj = function filterObj(obj) {
  for (var _len = arguments.length, allowedFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    allowedFields[_key - 1] = arguments[_key];
  }

  var newObj = {};
  Object.keys(obj).forEach(function (el) {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
}; //exports.getUser = factory.getOne(User)


exports.getAllUsers = factory.getAll(UserModel);