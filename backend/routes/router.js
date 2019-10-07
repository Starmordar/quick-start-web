var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../models/user.shema');

router.get('/', function (req, res, next) {
  if (req.session.userId) {
    console.log(req.cookies);

    res.send("Already-registered")
  } else {
    res.send("Not registered yet")
  }
})

router.get('/registration', function (req, res, next) {
  const userData = {
    username: req.query.username,
    email: req.query.email,
    password: req.query.password
  }

  console.log(userData);

  User.findOne({ email: userData.email })
    .exec(function (err, user) {
      if (err) return next(err);
      else if (user) {
        res.send('email already taken');
      } else {
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
            } else res.send("a user with that nickname already exists");
          });
      }
    })
})

router.get('/auth', function (req, res, next) {
  const userData = {
    username: req.query.username,
    password: req.query.password
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