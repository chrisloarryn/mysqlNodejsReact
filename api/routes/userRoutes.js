const express = require('express')

// const {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser
// } = require('./../controllers/userController')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const ticketRoutes = require('./../routes/ticketRoutes')

const router = express.Router()
// const router = express.Router({ mergeParams: true });

//const router = express.Router({ mergeParams: true });


// FOR MY TICKETS OPTION
router.use('/:userId/tickets', ticketRoutes);

router.post('/signup', authController.signup)
router.post('/login', authController.login)

// Protect all routes after this middleware
// router.use(authController.protect)
 


// Routes protected and restricted to admin
router.use(
    // authController.isLoggedIn, 
    authController.restrictTo('admin')
)

router
    .route('/')
    .get(userController.getAllUsers)



module.exports = router