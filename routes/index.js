var express = require('express')
var path = require('path')
var router = express.Router()
var xml = require('xml')
require('isomorphic-fetch')

/* GET home page. */
router.get('/app*', (req, res, next) => {
  res.sendfile('./views/index.html')
})

router.get('/goodreads', (req, res, next) => {
  let target = (req.query.page) + '&q=' + encodeURIComponent(req.query.q)
  res.set('Content-Type', 'text/xml')

  fetch(target)
    .then(response => response.text())
    .then(data => {
      res.send((data))
    })
})

module.exports = router
