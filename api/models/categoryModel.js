'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name : {
      type: String
    },
    image: {
      type: String
    },
    status: {
      type: Number
    },
    created_on: {
      type: Date
    }, 
    viewedCount: {
      type: Number
    }
});

module.exports = mongoose.model('category', schema);