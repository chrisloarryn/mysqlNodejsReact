const router = require('express').Router()
const { checkToken } = require('../../auth/token_validation')
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require('./user.controller')

router.get('/', checkToken, getUsers) // checkToken

router.post('/', createUser) // checkToken
router.get('/:id', checkToken, getUserByUserId)
router.post('/login', login)
router.patch('/', checkToken, updateUsers)
router.delete('/', checkToken, deleteUser)

module.exports = router
