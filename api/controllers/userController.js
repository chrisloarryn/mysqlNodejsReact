//const User = require('./../models/userModel')
//const { User } = require('./../models/index')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory')

const filterObj = (obj, ...allowedFields) => {
  let newObj = {}
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.setTicketUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.ticket) req.body.ticket = req.params.ticketId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

//exports.getUser = factory.getOne(User)
exports.getAllUsers = factory.getAll('usuarios')