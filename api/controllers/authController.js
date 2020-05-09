const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
//const User = require('../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
//const sendEmail = require('./../utils/email')
const { loadConfig } = require('../config/config')
loadConfig()
const helpers = require('./../lib/helpers')

const pool = require('./../db/database');

let user = {}

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id)
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  }

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') cookieOptions.secure = true
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
  console.log(req.body)
  // to validate ok data
  if (!id_tipouser || !nombre || !email || !pass) {
    return next(new AppError('Please provide needed data!', 400))
  }
  let newUser = {
    id_tipouser, nombre, email, pass
  }
  newUser.pass = await helpers.encryptPassword(pass)

  const rows = await pool.query(`SELECT * FROM usuarios where email = ?`, [email], (err, rows) => {
    if (err) return next(new AppError('Please check your email!', 400))
    if (rows) return next(new AppError('Please provide another email, user exists!', 400))
  })

  const result = await pool
    .query("INSERT INTO usuarios (id_tipouser, nombre, email, pass) values (?,?,?,?)",
      [newUser.id_tipouser, newUser.nombre, newUser.email, newUser.pass], (err, rows) => {
        if (err) return next(new AppError('Error while saving user!', 400))
        newUser.id = rows.insertId
        if (rows) createSendToken(newUser, 201, req, res)
      })
})

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({ status: 'success' })
}

exports.login = catchAsync(async (req, res, next) => {
  const { email, pass } = req.body

  // 1) Check if email and password exists
  if (!email || !pass) {
    return next(new AppError('Please provide email and password!', 400))
  }

  // 2) Check if user exists password is correct
  const row = await pool.query(`SELECT u.*, t.nombre as role FROM usuarios u join tipo_usuario t on u.id_tipouser = t.id
  where u.email = ?`, [email], (err, rows) => {
    userHandler(err, rows)
  })

  const userHandler = async (err, rows) => {
    if (err) return next(new AppError('Please enter a valid email!', 400))
    if (rows) {
      req.body.user = { ...rows[0] }
      // console.log('fdsd', req.body)
      if (!rows.length && !rows[0]) return next(new AppError('No document found with that ID', 400))

      if (!rows[0].email || !(await helpers.matchPassword(pass, rows[0].pass))) {
        return next(new AppError('Incorrect email or password (or user is inactive)', 401))
      }
      const body = { ...req.body.user }

      req.user = rows[0]
      console.log(req.user)
      // 3) If everything is ok, send the token to client
      createSendToken(rows[0], 200, req, res)

    }
  }

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
  const Id = decoded.id

  // 3) Check if user still exists => .select('+field') to show it
  const currentUser = await pool.query(`SELECT * FROM usuarios where id = ?`, [Id], (err, rows) => {
    userHandler(err, rows)
  })
  // const currentUser = await User.findById(decoded.id) // .select('+password')
  const userHandler = async (err, rows) => {
    if (err) return next(new AppError('Invalid token or authorization!', 400))
    if (rows) {
      req.user = rows[0]
      if (!rows.length && !rows[0]) {
        return next(
          new AppError(
            'The user belonging to this token does not longer exist.',
            401
          )
        )
      }
      // GRANT ACCESS TO PROTECTED ROUTE
      // req.user = currentUser
      next()

    }
  }
})

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    // id_tipouser: 1200001, user
    // id_tipouser: 1200002, admin
    
    // Roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}