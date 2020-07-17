'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    senderId : {
      type: String
    },
    receiverId : {
      type: String
    },
    media : {
      type: String
    },
    text: {
      type : String
    },
    senderStatus:{
      type : Number
    },
    receiverStatus:{
      type : Number
    },
    created_on: {
      type: Date
    }
});

module.exports = mongoose.model('chat', chatSchema);