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
  let target = req.query.torequest

  if (validString(req.query.q)) {
    target += '&q=' + encodeURIComponent(req.query.q)
  }

  if (validString(req.query.page)) {
    target += '&page=' + encodeURIComponent(req.query.page)
  }

  res.set('Content-Type', 'text/xml')
  fetch(target)
    .then(response => response.text())
    .then(data => {
      res.send((data))
    })
})

function validString(obj) {
  return typeof obj !== 'undefined' &&
    obj !== null &&
    obj.length > 0
}

module.exports = router
