'use strict';

var mongoose = require('mongoose');
var FirebaseTokens = mongoose.model('FirebaseTokens');
var admin = require('firebase-admin');
var serviceAccount = require("../../keys/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inw-vodafone-mate.firebaseio.com"
});

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

exports.test_send = function(req, res) {
  var to = req.body;
  
  var payload = {
    data: {
      RATE_APP: "true"
    }
  };

  admin.messaging().sendToDevice(to.token, payload, {})
    .then(function(response) {
      console.log("Successfully sent message:", response);
      res.send(response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
      res.send(error);
    });
}
