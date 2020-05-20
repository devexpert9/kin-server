'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   
    name : {
      type: String
    },
    username : {
      type: String
    },
    email: {
      type: String,
    },
    password: {
      type : String
    },
    created_on: {
      type: Date
    },
    image: {
      type: String
    }
});

module.exports = mongoose.model('users', userSchema);