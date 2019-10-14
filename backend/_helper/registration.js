const { _helper } = require("./helper")
const bcrypt = require('bcryptjs');
const User = require('../models/user.shema');

const _registration = {

    isUserLoggedIn: (req, res, next) => {
        if (req.session.userId && req.cookies[_helper.COOKIES_PROP]) {
            res.send(_helper.USER_ALREADY_REGISTER)
        } else {
            res.send(_helper.USER_NOT_REGISTER_YET)
        }
    },

    userSignOut: (req, res, next) => {
        if (req.session.userId && req.cookies[_helper.COOKIES_PROP]) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.send(_helper.SERVER_USER_SUCCESSFUL_SIGNED_OUT);
                }
            });
        }
    },

    userLogIn: (req, res, next) => {
        const userData = {
            username: req.query.username,
            password: req.query.password
        }

        User.findOne({ username: userData.username })
            .exec((err, user) => {
                if (err) return next(err);

                else if (user) {

                    bcrypt.compare(userData.password, user.password, function (err, result) {

                        if (result === true) {
                            req.session.userId = user._id;
                            res.send(_helper.FIND_USER_SUCCESS)
                        }

                        else res.send(_helper.FIND_PASSWORD_ERROR)
                    })
                }

                else {
                    res.send(_helper.FIND_USER_WRONG_USERNAME)
                }
            })
    },

    userSignIn: function (req, res, next) {

        function findUserAndResolveStatusMsg(params, errorMessage, successMessage) {

            return new Promise(function (resolve, reject) {
                User.findOne(params)
                    .exec((err, user) => {
                        if (err) reject(err);

                        else if (user) resolve(errorMessage);

                        else resolve(successMessage)
                    })
            })
        }

        const userData = {
            username: req.query.username,
            email: req.query.email,
            password: req.query.password
        }
        
        Promise.all([
           findUserAndResolveStatusMsg(
                { email: userData.email },
                _helper.WARNING_EMAIL_ALREADY_TAKEN,
                _helper.UNIQUE_VALUE
            ),
            findUserAndResolveStatusMsg(
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

            else {
                User.create(userData, function (error, user) {
                    if (error) return next(error);

                    else {
                        req.session.userId = user._id;

                        res.send(_helper.USER_CREATED_SUCCESSFUL)
                    }
                })
            }
        }).catch(function (err) {
            console.error(err.message)
        })
    }
}

module.exports = {
    _registration: _registration
}