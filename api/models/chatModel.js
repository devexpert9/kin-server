'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
   
    groupid : {
      type: String
    },
    userid: {
      type: String
    },
    message: {
      type: String
    },
    deletedusers: {
      type: Schema.Types.Mixed
    },
    created_on: {
      type: Date
    }

});

module.exports = mongoose.model('chat', chatSchema);