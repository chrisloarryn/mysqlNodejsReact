const express = require('express');
const ticketController = require('./../controllers/ticketController');
const authController = require('./../controllers/authController');
const userRoutes = require('./../routes/userRoutes')

// const router = express.Router();
const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(
    authController.protect,
    // ticketController.setTicketUserIds,
    authController.restrictTo('admin'),
    ticketController.createTicket
  );

router
  .route('/:id')
  .get(ticketController.getTicket)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    //tourController.uploadTourImages,
    //tourController.resizeTourImages,
    ticketController.updateTicket
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    ticketController.deleteTicket
  );

module.exports = router;
