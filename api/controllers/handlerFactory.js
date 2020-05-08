const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const APIFeatures = require('./../utils/apiFeatures')
const jwt = require('jsonwebtoken')
const { loadConfig } = require('../config/config')
loadConfig()
const pool = require('./../db/poolDb')

// models
// const model = require('../models/index')


exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    // delete operation
    // const doc = await Model.findByIdAndDelete(req.params.id)

    const id = req.params.id
    const doc = await pool.query(`DELETE FROM ${Model} where id = ${id}`);

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
    //const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // })
    // 
    const id = req.params.id
    let { ticket_pedido, id_usuario } = req.body
    const ticket = await pool.query(`SELECT * FROM ${Model} where id = ${id}`);

    if(!ticket_pedido) ticket_pedido = ticket[0].ticket_pedido
    if(!id_usuario) id_usuario = ticket[0].id_user
    
    const updateOneData = {
      id_user: id_usuario,
      ticket_pedido
    }

   const doc = await pool.query(`UPDATE ${Model} set ? where id = ?`, [updateOneData, id]);

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
    const doc = await pool.query(`INSERT INTO ${Model} (id_user, ticket_pedido) values (null, '${req.body.ticket_pedido}')`);

    //const newTour = newTour({})  //newTour.save()
    //const doc = await Model.create(req.body)

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
    const doc = await pool.query(`SELECT * FROM ${Model} where id = ${id}`);

    // let query = Model.findById(req.params.id)
    // if (popOptions) query = query.populate(popOptions)
    // const doc = await query

    // const doc = await Model.findById(req.params.id).populate(popOptions)
    // const tour = await Tour.findOne({ _id: req.params.id})
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

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for  nested GET reviews o tour (hack)
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }
    const doc = await pool.query(`SELECT * FROM ${Model}`);
    //  WHERE user_id = ?', [req.user.id]
    // EXECUTE QUERY
    // const features = new APIFeatures(Model.find(filter), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate()
    // const doc = await features.query
    // const doc = await features.query.explain()

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
