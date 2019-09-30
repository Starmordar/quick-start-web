var express = require('express');
var router = express.Router();
var User = require('../models/user.shema');


router.post('/', function (req, res, next) {
  console.log(req.body)
});

module.exports = router;