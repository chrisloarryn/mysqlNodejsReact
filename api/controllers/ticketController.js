const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');


exports.setTicketUserIds = (req, res, next) => {
    // Allow nested routes
    console.log('USER:::', req.user)
    if (!req.body.ticket) req.body.ticket = req.params.ticketId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  };

exports.getAllTickets = factory.getAll('ticket');
// exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getTicket = factory.getOne('ticket');
exports.createTicket = factory.createOne('ticket');
exports.updateTicket = factory.updateOne('ticket');
exports.deleteTicket = factory.deleteOne('ticket');