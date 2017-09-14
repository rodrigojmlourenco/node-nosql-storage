'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  full_name: {
    type: String,
    trim: true
  },
  email : {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  pwd_hash: {
    type: String,
    required: true
  },
  created : {
    type : Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.pwd_hash);
}

module.exports = mongoose.model('User', UserSchema);
