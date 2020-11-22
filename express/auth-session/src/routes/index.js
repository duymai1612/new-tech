const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Application' })
})

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/sign-up', function (req, res) {
  res.render('sign-up')
})

router.get('/restricted', authMiddleware.restrict, function (req, res) {
  res.send('TaDa! restricted area, click to <a href="/logout">logout</a>')
})

router.get('/logout', function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect('/')
  })
})

module.exports = router
