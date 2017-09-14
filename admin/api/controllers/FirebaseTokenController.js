'use strict';

var mongoose = require('mongoose');
var FirebaseTokens = mongoose.model('FirebaseTokens');
var SatisfactionSurvey = mongoose.model('SatisfactionSurveys');
var admin = require('firebase-admin');
var serviceAccount = require("../../keys/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inw-vodafone-mate.firebaseio.com"
});

function fetchParticipantTokens(appId, callback) {
  SatisfactionSurvey
    .aggregate([{
        $match: {
          app: appId,
          token: {
            $exists: true
          }
        }
      },
      {
        $project: {
          token: 1
        }
      }
    ])
    .exec(callback);
};

function fetchTokensDifference(appId, tokens, callback) {
  FirebaseTokens.find({
    app: appId,
    token: {
      $nin: tokens
    }
  }, {
    token: 1
  }).exec(callback);
}



exports.save_token = function(req, res) {
  var token = new FirebaseTokens(req.body)

  token.save(function(err, survey) {
    if (err)
      res.send(err);
    else
      res.json({
        data: token
      });
  });
};

exports.get_tokens = function(req, res) {
  FirebaseTokens.find({
    app: req.params.appId
  }, function(err, tokens) {
    if (err)
      res.send(err);
    else {
      res.json({
        data: tokens
      });
    }
  });
};

exports.notifyTo = function(req, res) {
  console.log(req.body);
  var tokenPayload = req.body;
  var payload = {
    data: {
      RATE_APP: "true"
    }
  };

  if (tokenPayload.token) {
    admin.messaging().sendToDevice(tokenPayload.token, payload)
      .then(function(response) {
        console.log("Successfully sent message:", response);
        res.send(response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
        res.send(error);
      });
  } else {
    res.send("Missing token!");
  }
}

exports.notifyAllMissing = function(req, res) {

  console.log("[PUSH] Sending rate broadcast to " + req.params.appId);

  fetchParticipantTokens(req.params.appId, function(err, rates) {
    if (err)
      res.send(err);
    else {
      var tokens = [];
      rates.forEach(function(rate, index) {
        tokens.push(rate.token);
      });

      if(tokens.lenght <= 0){
        console.log("[BROADCAST] No one to notify");
        res.send();
        return;
      }

      fetchTokensDifference(req.params.appId, tokens, function(err, toks) {
        if (err)
          res.send(err);
        else {

          var payload = {
            data: {
              RATE_APP: "true"
            }
          };

          var recipients = []
          toks.forEach(function(ft, i) {
            recipients.push(ft.token);
          })

          console.log("[PUSH] notifying " + recipients.lenght + " recipients");

          admin.messaging().sendToDevice(recipients, payload)
            .then(function(response) {
              console.log("Successfully sent message:", response);
            })
            .catch(function(error) {
              console.log("Error sending message:", error);
            });

          res.send(recipients);
        }
      });
    }
  });
}
