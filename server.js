var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  options = {
    //useMongoClient: true,
    db: {
      native_parser: true
    },
    user: process.env.USERNAME,
    pass: process.env.PASSWORD,
    auth: {
      authdb: 'admin'
    }
  };

var SatisfactionSurvey  = require('./api/models/SatisfactionSurveyModel'),
    FirebaseToken       = require('./api/models/FirebaseTokenModel');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mate', options)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var surveyRoutes    = require('./api/routers/SatisfactionSurveyRouter');
var firebaseRoutes  = require('./api/routers/FirebaseTokenRouter');
surveyRoutes(app);
firebaseRoutes(app);

app.listen(port);

console.log('Vodafone Mate Support running @' + port);
console.log()
