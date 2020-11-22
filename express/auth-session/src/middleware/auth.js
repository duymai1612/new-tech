const { User } = require('../models')

exports.authenticate = async function authenticate(username, password, cb) {
  const user = await User.findOne({ username }, 'username password').exec()
  console.log('Log: authenticate -> user', user)
  if (!user) return cb(new Error('user not found'))
  user.comparePassword(password)
    .then(isMatch => isMatch ? cb(null, user) : cb(new Error('invalid password')))
    .catch(cb)
}

exports.restrict = function restrict(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    req.session.error = 'Access denied!'
    res.redirect('/login')
  }
}