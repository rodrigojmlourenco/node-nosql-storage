'use strict';

module.exports = function(app) {
  var firebaseTokens = require('../controllers/FirebaseTokenController');

  app.route("/token")
    .post(firebaseTokens.save_token);

  app.route("token/to/:to")
    .post(firebaseTokens.test_send);

  app.route("/token/:appId")
    .get(firebaseTokens.get_tokens);
};
