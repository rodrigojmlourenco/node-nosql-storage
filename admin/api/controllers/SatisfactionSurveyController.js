'use strict';

var mongoose = require('mongoose');
var SatisfactionSurvey = mongoose.model('SatisfactionSurveys');


SatisfactionSurvey.byApp = function(appId){
  return this.find( { app : appId });
};



exports.saveSurvey = function(req, res) {
  var new_survey = new SatisfactionSurvey(req.body)

  new_survey.save(function(err, survey) {
    if (err)
      res.send(err);
    else
      res.json({data: survey});
  });
};

exports.getAppSurveys = function(req, res) {
  SatisfactionSurvey.find({ app: req.params.appId }, function(err, survey) {
    if (err)
      res.send(err);
    else {
      res.json({data: survey});
    }
  });
}

exports.getHelloWorld = function(req, res){
  res.send("Hello World!");
}
