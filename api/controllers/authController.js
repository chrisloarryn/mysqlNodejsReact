const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
//const User = require('../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
//const sendEmail = require('./../utils/email')

const pool = require('./../db/database');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)

  // Remove password from output
  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}

exports.signup = catchAsync(async (req, res, next) => {
  const { id_tipouser, nombre, email, pass } = req.body
  // to validate ok data
  if (!id_tipouser || !nombre || !email || !pass) {
    return next(new AppError('Please provide needed data!', 400))
  }
  const newUser = {
    id_tipouser: id_tipouser,
    nombre: nombre,
    email: email,
    pass: pass
  }

  pool.query(
    `insert into usuarios(id_tipouser, nombre, email, pass) 
                values(${id_tipouser},${nombre},${email},${pass})`,
    (err, rows) => {
      if (err) {
        throw err
      }
      console.log(null, rows);
    }
  );

  //createSendToken(newUser, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  // 1) Check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400))
  }

  // 2) Check if user exists password is correct
  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password (or user is inactive)', 401))
  }

  // 3) If everything is ok, send the token to client
  createSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(
      new AppError('Your are not logged in! Please log in to get access.', 401)
    )
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if user still exists => .select('+field') to show it
  const currentUser = await User.findById(decoded.id) // .select('+password')

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does not longer exist.',
        401
      )
    )
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    )
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}
