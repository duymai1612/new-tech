const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/', userController.getUsers)
router.post('/', userController.createUser)
router.patch('/:id', userController.updateUserById)
router.put('/:id', userController.replaceUserById)
router.delete('/:id', userController.deleteUserById)

router.post('/login', userController.login)
router.post('/sign-up', userController.signUp)

module.exports = router
