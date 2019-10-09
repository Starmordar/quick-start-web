var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../models/user.shema');

const { findUserByParams } = require('../database/queries');

router.get('/', function (req, res, next) {
  if (req.session.userId && req.cookies['connect.sid']) {
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

  Promise.all([
    findUserByParams({ email: userData.email }, 'email already taken'),
    findUserByParams({ username: userData.username }, "a user with that nickname already exists")
  ]).then(function (mongoResponces) {

    mongoResponces.forEach(mongoResponce => {
      if (mongoResponce === "email already taken") res.send("email already taken");
      else if (mongoResponce === "a user with that nickname already exists") res.send("a user with that nickname already exists");
    });

    if (mongoResponces[0] === "unique user" && mongoResponces[1] === "unique user") {

      User.create(userData, function (error, user) {
        if (error) return next(error);

        else {
          req.session.userId = user._id;

          res.send("User create successful")
        }
      })
    }
  }).catch(function (err) {
    console.log(11);
    console.error(err.message)
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