'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hostSchema = new Schema({
   
    firstname : {
      type: String
    },
    lastname: {
      type: String
    },
    username: {
      type: String
    },
    email: {
      type: String
    },
    contact: {
      type : String
    },
    status:{
      type: String
    },
    address:{
      type: String
    },
    created_on: {
      type: Date
    }
});

module.exports = mongoose.model('hosts', hostSchema);