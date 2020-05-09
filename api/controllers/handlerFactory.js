const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/apiFeatures')
const jwt = require('jsonwebtoken')
const { loadConfig } = require('../config/config')
loadConfig()
const pool = require('./../db/poolDb')


exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
 

    const id = req.params.id
    const doc = await pool.query(`DELETE FROM ${Model} where id = ${id}`)

    if (!doc) {
      return next(new AppError(`No document found with that ID`, 404))
    }
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: null
    })
  })

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id
    let { ticket_pedido, id_usuario } = req.body
    const ticket = await pool.query(`SELECT * FROM ${Model} where id = ${id}`)

    if (!ticket_pedido) ticket_pedido = ticket[0].ticket_pedido
    if (!id_usuario) id_usuario = ticket[0].id_user

    const updateOneData = {
      id_user: id_usuario,
      ticket_pedido
    }

    const doc = await pool.query(`UPDATE ${Model} set ? where id = ?`, [
      updateOneData,
      id
    ])

    if (!doc) return next(new AppError('No document found with that ID', 404))
    res.status(200).json({
      status: 'success',
      data: {
        data: {
          doc,
          ticket: updateOneData
        }
      }
    })
  })

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const id = req.body.id_user ? req.body.id_user : null
    const doc = await pool.query(
      `INSERT INTO ${Model} (id_user, ticket_pedido) values (${id}, '${req.body.ticket_pedido}')`
    )

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        data: {
          doc,
          ticket: req.body
        }
      }
    })
  })

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params
    const doc = await pool.query(`SELECT * FROM ${Model} where id = ${id}`)
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    })
  })

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for  nested GET reviews o tour (hack)
    let doc;
    //if (req.params.tourId) filter = { tour: req.params.tourId }
    if (Model === 'ticket') {
      doc = await pool.query(`SELECT * FROM ${Model}`)
    } else if(Model === 'usuarios') {
      doc = await pool.query(`SELECT u.*, t.nombre as role FROM ${Model} u join tipo_usuario t on u.id_tipouser = t.id`)
      for (const user of doc) {
        const res = await pool.query(`SELECT COUNT(*) FROM ticket t where t.id_user = ${user.id}`)
        const value = Object.values(res[0])[0]
        user.cant = value ? value : 0
      }
    }

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: doc.length,
      data: {
        data: doc
      }
    })
  })
