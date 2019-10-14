var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../models/user.shema');
var Workspace = require('../models/workspace.shema');


const { findUserByParams, createNewUserAndSetCurrentSession } = require('../database/queries');

const { _helper } = require('../_helper/helper');

router.get(_helper.PATH_IS_USER_ALREADY_IN_SYSTEM, (req, res, next) => {

  if (req.session.userId && req.cookies[_helper.COOKIES_PROP]) {
    res.send(_helper.USER_ALREADY_REGISTER)
  } else {
    res.send(_helper.USER_NOT_REGISTER_YET)
  }
})

router.get(_helper.PATH_USER_REGISTRATION, (req, res, next) => {
  const userData = {
    username: req.query.username,
    email: req.query.email,
    password: req.query.password
  }

  Promise.all([
    findUserByParams(
      { email: userData.email },
      _helper.WARNING_EMAIL_ALREADY_TAKEN,
      _helper.UNIQUE_VALUE
    ),
    findUserByParams(
      { username: userData.username },
      _helper.WARNING_USER_WITH_PARTICULAR_USERNAME_EXISTS,
      _helper.UNIQUE_VALUE
    )
  ]).then(function (mongoResponces) {

    let lastErrorMessage = "";

    mongoResponces.forEach(mongoResponce => {
      if (mongoResponce === _helper.WARNING_EMAIL_ALREADY_TAKEN) {
        lastErrorMessage = _helper.WARNING_EMAIL_ALREADY_TAKEN
      }
      else if (mongoResponce === _helper.WARNING_USER_WITH_PARTICULAR_USERNAME_EXISTS) {
        lastErrorMessage = _helper.WARNING_USER_WITH_PARTICULAR_USERNAME_EXISTS
      }
    });

    if (lastErrorMessage.length !== 0) res.send(lastErrorMessage);
    else createNewUserAndSetCurrentSession(res, req, next, userData);

  }).catch(function (err) {
    console.error(err.message)
  })
})

router.get(_helper.PATH_USER_SIGHIN, (req, res, next) => {
  const userData = {
    username: req.query.username,
    password: req.query.password
  }

  User.findOne({ username: userData.username })
    .exec((err, user) => {
      if (err) return next(err);

      else if (user) {

        bcrypt.compare(userData.password, user.password, function (err, result) {
          console.log(result);
          if (result === true) res.send(_helper.FIND_USER_SUCCESS)
          else res.send(_helper.FIND_PASSWORD_ERROR)

        })
      }

      else {
        res.send(_helper.FIND_USER_WRONG_USERNAME)
      }
    })
});

router.post(_helper.PATH_CREATE_WORKSPACE, (req, res, next) => {
  const workspaceSettings = {
    userID: req.session.userId,
    name: req.body.name,
    category: req.body.category,
    isActive: req.body.isActive,
    dateString: "Added " + req.body.date,
    count: 0
  }
  
  Workspace.create(workspaceSettings, function (error, user) {
    console.log(error);
    if (error) return next(error);

    else {
      res.send(_helper.SERVER_WORKSPACE_CREATED_SECCESSFUL)
    }
  })
});

router.get(_helper.PATH_LOAD_WORKSPACE, (req, res, next) => {
  Workspace.find({ userID: req.session.userId }, function (error, workspaces) {
    if (error) return next(error);

    else {
      res.send(workspaces)
    }
  })
})

module.exports = router;