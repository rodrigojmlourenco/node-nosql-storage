'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FirebaseTokenSchema = new Schema({
  app: {
    type: String,
    required: 'Application identifier is mandatory'
  },
  token: {
    type : String,
    required : 'Firebase token is mandatory'

  }
  submissionDate: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('FirebaseTokens', FirebaseTokenSchema);
