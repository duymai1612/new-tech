const { User } = require('../models')
const get = require('lodash/get')

function getUsers(req, res, next) {
  User.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => next(err))
}

function createUser(req, res, next) {
  const userData = req.body
  const newUser = new User(userData)
  newUser.save()
    .then(insertedUser => res.send(insertedUser))
    .catch(err => next(err))
}

function updateUserById(req, res, next) {
  const userData = req.body
  const _id = get(req, 'params.id', '')
  User.updateOne({ _id }, userData)
    .then(() => res.status(204).end())
    .catch(err => next(err))
}

function replaceUserById(req, res, next) {
  const userData = req.body
  const _id = get(req, 'params.id', '')
  User.replaceOne({ _id }, { ...userData, _id })
    .then(() => res.status(204).end())
    .catch(err => next(err))
}

function deleteUserById(req, res, next) {
  const _id = get(req, 'params.id', '')
  User.deleteOne({ _id })
    .then(() => res.status(204).end())
    .catch(err => next(err))
}

module.exports = {
  getUsers,
  createUser,
  updateUserById,
  replaceUserById,
  deleteUserById
}