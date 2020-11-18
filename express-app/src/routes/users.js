const express = require('express');
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUserById,
  replaceUserById,
  deleteUserById
} = require('../controllers/user')

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUserById);
router.put('/:id', replaceUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
