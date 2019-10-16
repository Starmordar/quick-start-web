const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user.shema');
const Workspace = require('../models/workspace.shema');

const { _helper } = require('../_helper/helper');
const { _registration } = require('../_helper/registration')

router.get(_helper.PATH_IS_USER_ALREADY_IN_SYSTEM, _registration.isUserLoggedIn);
router.get(_helper.PATH_SIGNOUT, _registration.userSignOut);
router.get(_helper.PATH_USER_SIGHIN, _registration.userLogIn.bind(this));
router.get(_helper.PATH_USER_REGISTRATION, _registration.userSignIn)

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

module.exports = router;