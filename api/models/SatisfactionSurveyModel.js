'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SatisfactionSurveySchema = new Schema({
  app: {
    type: String,
    required: 'Application identifier is mandatory'
  },
  email: {
    type : String,
    required : 'Email address is mandatory'

  },
  token: {
    type: String,
    required: 'Firebase token is mandatory'
  },
  rating: {
    type : String,
    required : 'Rating is mandatory'
  },
  suggestion: {
    type : String
  },
  submissionDate: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('SatisfactionSurveys', SatisfactionSurveySchema);
