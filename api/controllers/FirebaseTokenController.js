'use strict';

var mongoose = require('mongoose');
var FirebaseTokens = mongoose.model('FirebaseTokens');

exports.save_token = function(req, res) {
  var token = new FirebaseTokens(req.body)

  token.save(function(err, survey) {
    if (err)
      res.send(err);
    else
      res.json({data: token});
  });
};

exports.get_tokens = function(req, res) {
  FirebaseTokens.find({ app: req.params.appId }, function(err, tokens) {
    if (err)
      res.send(err);
    else {
      res.json({data: tokens});
    }
  });
};
