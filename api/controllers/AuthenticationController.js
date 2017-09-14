'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = mongoose.model('User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.login = function(req, res) {

  var username = req.body.username.trim();
  var password = req.body.password.trim();

  if (username == undefined) {
    res.status(400).send({
      message: "Missing username"
    });
    return;
  } else if (password == undefined) {
    res.status(400).send({
      message: "Missing password"
    });
    return;
  } else {
    User.findOne({
      email: username
    }, function(err, user) {
      if (err) throw err;
      if (!user) res.status(401).json({
        message: 'Authentication failed. User not found.'
      });
      else if (user) {
        if (!user.comparePassword(password)) {
          res.status(401).json({
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          return res.json({
            token: jwt.sign({
              email: user.email,
              fullName: user.fullName,
              _id: user._id
            }, 'RESTFULAPIs')
          });
        }
      }
    });
  }
}

exports.logout = function(req, res) {
  res.send("TODO");
}

exports.register = function(req, res) {

  var user = new User(req.body);

  if (req.body.password == undefined) {
    res.status(400).send({
      message: "Please define a password"
    });
    return;
  } else if (req.body.pwd_confirm == undefined || req.body.pwd_confirm != req.body.password) {
    res.status(400).send({
      message: "The confirmation password must be equal to the provided password."
    });
    return;
  }

  user.username = user.username == undefined ? user.email : user.username;
  user.pwd_hash = bcrypt.hashSync(req.body.password, 10);

  user.save(function(err, result) {
    if (err) res.status(400).send({
      error: 100,
      message: err.message
    });
    else res.send("ok");
  });
}
