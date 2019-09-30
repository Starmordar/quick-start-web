var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../models/user.shema');

router.post('/', function (req, res, next) {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }

  User.findOne({ username: userData.username })
    .exec(function (err, user) {
      if (err) {
        return next(err)
      } else if (!user) {

        User.create(userData, function (error, user) {
          if (error) {
            return next(error);
          } else {
            req.session.userId = user._id;
            res.send("User create successful")
          }
        });
      } else {
        bcrypt.compare(userData.password, user.password, function (err, result) {
          if (result === true) {
            res.send("User was here")
          } else {
            res.send("Error password")
          }
        })
      }
    });
});

module.exports = router;