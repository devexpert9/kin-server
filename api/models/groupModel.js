'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
   
    image : {
      type: String
    },
    name: {
      type: String
    },
    userdata: {
      type: Schema.Types.Mixed
    },
    created_on: {
      type: Date,
    }

});

module.exports = mongoose.model('group', groupSchema);