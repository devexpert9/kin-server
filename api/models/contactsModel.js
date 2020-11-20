'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactsSchema = new Schema({
    patientId:{
      type: String
    },
    name : {
      type: String
    },
    phone : {
      type: String
    },
    userId: {
      type : String
    },
    created_on: {
      type: Date
    }
});

module.exports = mongoose.model('contacts', contactsSchema);