var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/*', (req, res, next) => {
  res.sendfile('./views/index.html')
});

module.exports = router;
