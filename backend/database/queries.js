const User = require('../models/user.shema');

const { _helper } = require("../_helper/helper");

function findUserByParamsAndResolveStatusMsg(params, errorMessage, successMessage) {

  return new Promise(function (resolve, reject) {
    User.findOne(params)
      .exec((err, user) => {
        if (err) reject(err);

        else if (user) resolve(errorMessage);

        else resolve(successMessage)
      })
  })
}

function createNewUserAndSetCurrentSession(res, req, next, userData) {

  User.create(userData, function (error, user) {
    if (error) return next(error);

    else {
      req.session.userId = user._id;

      res.send(_helper.USER_CREATED_SUCCESSFUL)
    }
  })
}

module.exports = {
  findUserByParamsAndResolveStatusMsg: findUserByParamsAndResolveStatusMsg,
  createNewUserAndSetCurrentSession: createNewUserAndSetCurrentSession
}