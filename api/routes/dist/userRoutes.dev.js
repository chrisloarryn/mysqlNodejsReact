"use strict";

var express = require('express'); // const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser
// } = require('./../controllers/userController')


var userController = require('./../controllers/userController');

var authController = require('./../controllers/authController');

var router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login); // Protect all routes after this middleware
// router.use(authController.protect)
// Routes protected and restricted to admin
// router.use(authController.restrictTo('admin'))

router.route('/').get(userController.getAllUsers); // router
//     .route('/:id')
//     .get(userController.getUser)

module.exports = router;