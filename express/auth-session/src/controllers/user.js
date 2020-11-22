const get = require('lodash/get')

const { User } = require('../models')
const authMiddleware = require('../middleware/auth')

exports.getUsers = function getUsers(req, res, next) {
  User.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => next(err))
}

exports.createUser = function createUser(req, res, next) {
  const userData = req.body
  const newUser = new User(userData)
  newUser.save()
    .then(insertedUser => res.send(insertedUser))
    .catch(err => next(err))
}

exports.updateUserById = function updateUserById(req, res, next) {
  const userData = req.body
  const _id = get(req, 'params.id', '')
  User.updateOne({ _id }, userData)
    .then(() => res.status(204).end())
    .catch(err => next(err))
}

exports.replaceUserById = function replaceUserById(req, res, next) {
  const userData = req.body
  const _id = get(req, 'params.id', '')
  User.replaceOne({ _id }, { ...userData, _id })
    .then(() => res.status(204).end())
    .catch(err => next(err))
}

exports.deleteUserById = function deleteUserById(req, res, next) {
  const _id = get(req, 'params.id', '')
  User.deleteOne({ _id })
    .then(() => res.status(204).end())
    .catch(err => next(err))
}

exports.login = function login(req, res) {
  const { username, password } = req.body
  authMiddleware.authenticate(username, password, function (err, user) {
    if (user) {
      // Regenerate session when signing in to prevent fixation
      req.session.regenerate(function () {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user
        req.session.success = 'Authenticated as ' + user.username
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.'
        res.redirect('back')
      })
    } else {
      req.session.error = 'Authentication failed, please check your username and password.'
      res.redirect('/login')
    }
  })
}

exports.signUp = function signUp(req, res, next) {
  const userData = req.body
  const newUser = new User(userData)
  newUser.save()
    .then(insertedUser => {
      req.session.regenerate(function () {
        req.session.user = insertedUser
        req.session.success = 'Authenticated as ' + insertedUser.username
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.'
        res.redirect('/login')
      })
    })
    .catch(err => {
      req.session.error = err.message || 'Validation failed, please check your credentials!'
      res.redirect('back')
    })
}
