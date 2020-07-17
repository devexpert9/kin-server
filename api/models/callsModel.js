'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var callsSchema = new Schema({
    contactId : {
      type: String
    },
    callDate : {
      type: Date
    },
    callTime : {
      type: String
    },
    userId: {
      type : String
    },
    created_on: {
      type: Date
    }
});

module.exports = mongoose.model('calls', callsSchema);