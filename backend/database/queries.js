const User = require('../models/user.shema');

function findUserByParams(params, returnString) {

  return new Promise(function (resolve, reject) {
    User.findOne(params)
      .exec((err, user) => {
        if (err) reject(err);

        else if (user) resolve(returnString);

        else resolve("unique user")
      })
  })
  
}

module.exports = {
  findUserByParams: findUserByParams
}