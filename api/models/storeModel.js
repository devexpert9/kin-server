'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
   
    title : {
      type: String
    },
    points: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    created_on: {
      type: Date
    },
    created_at: {
      type: String
    },
});

module.exports = mongoose.model('store', storeSchema);