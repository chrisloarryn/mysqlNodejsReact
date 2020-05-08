"use strict";

var catchAsync = require('./../utils/catchAsync');

var AppError = require('./../utils/appError');

var APIFeatures = require('./../utils/apiFeatures');

var jwt = require('jsonwebtoken');

var _require = require('../config/config'),
    loadConfig = _require.loadConfig; // models


var model = require('../models/index');

loadConfig();

exports.deleteOne = function (Model) {
  return catchAsync(function _callee(req, res, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (doc) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", next(new AppError("No document found with that ID", 404)));

          case 2:
            res.status(204).json({
              status: 'success',
              requestedAt: req.requestTime,
              data: null
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.updateOne = function (Model) {
  return catchAsync(function _callee2(req, res, next) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (doc) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", next(new AppError('No document found with that ID', 404)));

          case 2:
            res.status(200).json({
              status: 'success',
              data: {
                data: doc
              }
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
};

exports.createOne = function (Model) {
  return catchAsync(function _callee3(req, res, next) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //const newTour = newTour({})  //newTour.save()
            //const doc = await Model.create(req.body)
            res.status(201).json({
              status: 'success',
              requestedAt: req.requestTime,
              data: {
                data: doc
              }
            });

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
};

exports.getOne = function (Model, popOptions) {
  return catchAsync(function _callee4(req, res, next) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (doc) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", next(new AppError('No document found with that ID', 404)));

          case 2:
            res.status(200).json({
              status: 'success',
              data: {
                data: doc
              }
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
};

exports.getAll = function (Model) {
  return catchAsync(function _callee5(req, res, next) {
    var filter;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.params); // To allow for  nested GET reviews o tour (hack)

            filter = {};
            if (req.params.tourId) filter = {
              tour: req.params.tourId
            };
            model.User.findAll().then(function (users) {
              return console.log(users);
            })["catch"](function (err) {
              console.log(err);
            }); //console.log(doc)
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
              results: 'doc.length',
              data: {
                data: 'doc'
              }
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
};