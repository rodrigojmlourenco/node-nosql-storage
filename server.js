var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  //Firebase FCM
  fcmAdmin = require('firebase-admin'),
  serviceAccount = require("./keys/serviceAccountKey.json"),

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

//BEGIN: FCM TESTING
fcmAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://inw-vodafone-mate.firebaseio.com"
});

var payload = {
  notification: {
    title: "Account Deposit",
    body: "A deposit to your savings account has just cleared."
  },
  data: {
    account: "Savings",
    balance: "$3020.25",
    RATE_APP: "true"
  }
};

fcmAdmin.messaging().sendToDevice("eWz_QxRI4-8:APA91bF2_Wm7bycLWmqGuoOSRKYBBSW3OFR30WK-vGcwgqpShtrcwGl_uM4s_DU2gQ0jseUOxaKGLa-pVjgY12ioddGvu0wsYXSp5SazzcaswvjkDYLwy_99Yp4f7Lr21fLSEMkSWlPW", payload, {})
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });

//END: FCM TESTING

//Models
var SatisfactionSurvey = require('./api/models/SatisfactionSurveyModel'),
    FirebaseToken = require('./api/models/FirebaseTokenModel');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/mate', options)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var surveyRoutes = require('./api/routers/SatisfactionSurveyRouter');
var firebaseRoutes = require('./api/routers/FirebaseTokenRouter');
surveyRoutes(app);
firebaseRoutes(app);

app.listen(port);

console.log('Vodafone Mate Support running @' + port);
console.log()
