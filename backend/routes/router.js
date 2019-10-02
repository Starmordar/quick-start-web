var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../models/user.shema');

router.get('/', function (req, res, next) {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views += 1;
  }

  res.json({
    "status" : "ok",
    "frequency" : req.session.views
  });
})

router.post('/', function (req, res, next) {
  console.log(req.session, req.cookies)

  if (req.session.userId) {
    res.send('redirect-middle')
  }

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
            console.log(req.session, req.cookies)
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