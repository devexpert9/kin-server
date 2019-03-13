'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsfeedSchema = new Schema({
   
    title : {
      type: String
    },
    image: {
      type: Schema.Types.Mixed
    },
    likes: {
      type: Schema.Types.Mixed
    },
    comments: {
      type: Schema.Types.Mixed
    },
    vedio: {
      type: String
    },
    user_id: {
      type: String
    },
    user_image: {
      type: String
    },
    user_name: {
      type: String
    },
    location: {
      type: String
    },
    created_on: {
      type: Date
    },
    created_at: {
      type: Date
    },
});

module.exports = mongoose.model('newsfeed', newsfeedSchema);