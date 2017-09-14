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
    required : 'Firebase token is mandatory',
    index : {
      unique: true,
      dropDups: true
    }
  },
  submissionDate: {
      type: Date,
      default: Date.now
  }
});

FirebaseTokenSchema.query.byApp = function(appId) {
  return this.find( { app : appId });
};

module.exports = mongoose.model('FirebaseTokens', FirebaseTokenSchema);
