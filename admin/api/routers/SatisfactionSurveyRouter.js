'use strict';

module.exports = function(app) {
  var satisfactionSurveys = require('../controllers/SatisfactionSurveyController');

  app.route("/survey")
    .post(satisfactionSurveys.saveSurvey);

  app.route("/survey/:appId")
    .get(satisfactionSurveys.getAppSurveys);

  app.route("/test")
    .get(satisfactionSurveys.getHelloWorld);
};
