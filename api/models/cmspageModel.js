'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmspageSchema = new Schema({
    page : {
      type: String
    },
    data: {
      type: Object
    },
    user_id:{
      type: String
    },
    created_at:{
      type: Date
    }
});

module.exports = mongoose.model('cmspages', cmspageSchema);