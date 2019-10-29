const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user.shema');
const Workspace = require('../models/workspace.shema');

const { _helper } = require('../_helper/helper');
const { _registration } = require('../_helper/registration')

let global;

router.get(_helper.PATH_IS_USER_ALREADY_IN_SYSTEM, _registration.isUserLoggedIn);
router.get(_helper.PATH_SIGNOUT, _registration.userSignOut);
router.get(_helper.PATH_USER_SIGHIN, _registration.userLogIn.bind(this));
router.get(_helper.PATH_USER_REGISTRATION, _registration.userSignIn)

router.get(_helper.PATH_USER_NOT_IN_SYSTEM, function (req, res, next) {
  if (!req.session.userId && !req.cookies[_helper.COOKIES_PROP]) {
    res.send(_helper.SERVER_USER_NOT_SIGIN)
  } else {
    res.send(_helper.USER_ALREADY_REGISTER)
  }
})

router.get(_helper.PATH_GET_USERNAME, function (req, res, next) {
  if (req.session.userId && req.cookies[_helper.COOKIES_PROP]) {

    User.findOne({ _id: req.session.userId }, function (error, user) {
      if (error) return next(error);

      else {
        res.send(user)
      }
    })

  }
})

router.post(_helper.PATH_ADD_WORKSPACE, function (req, res, next) {
  global = req.body.name
  res.send(_helper.SUCCESS_ASSIGN_GLOBAL)
})

router.get(_helper.PATH_GET_GLOBAL_WORKSPACE, function (req, res, next) {
  res.send(global)
})

router.post(_helper.PATH_UPDATE_WORKSPACE, function (req, res, next) {
  let technoData = []
  for (const key in req.body.browserData) {
    technoData.push({ [req.body.currentBrowser]: req.body.browserData[key] })
  }
  for (const key in req.body.technologiesData) {
    technoData.push({ [key]: req.body.technologiesData[key] })
  }

  Workspace.updateOne(
    { name: global },
    { $set: { technologies: technoData } }, function (error, workspace) {
      if (error) return next(error);

      else {
        res.send(_helper.SERVER_WORKSPACE_UPDATED_SUCCESSFUL)
      }
    }
  )
})

router.post(_helper.PATH_CREATE_WORKSPACE, (req, res, next) => {
  const workspaceSettings = {
    userID: req.session.userId,
    name: req.body.name,
    category: req.body.category,
    technologies: req.body.technologies,
    isActive: req.body.isActive,
    dateString: "Added " + req.body.date,
    count: 1
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

router.get(_helper.PATH_GET_WORKSPACES, (req, res, next) => {
  const userData = {
    username: req.body.name,
    password: req.body.password
  }

  User.findOne({ username: userData.username })
    .exec((err, user) => {
      if (err) return next(err);

      else if (user) {

        bcrypt.compare(userData.password, user.password, function (err, result) {

          if (result === true) {
            Workspace.find({ userID: user._id }, function (error, workspaces) {
              if (error) return next(error);

              else {
                res.send(workspaces)
              }
            })
          }

          else res.send(_helper.FIND_PASSWORD_ERROR)
        })
      }

      else {
        res.send(_helper.FIND_USER_WRONG_USERNAME)
      }
    })
})

module.exports = router;