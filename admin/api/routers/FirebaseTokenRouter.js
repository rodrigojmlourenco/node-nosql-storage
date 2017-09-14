'use strict';

module.exports = function(app) {
  var firebaseTokens = require('../controllers/FirebaseTokenController');

  app.route("/token/to")
    .post(firebaseTokens.sendTo);

  app.route("/token/:appId")
    .get(firebaseTokens.get_tokens);

  app.route("/broadcast/rate/:appId")
    .post(firebaseTokens.test_send);
};
