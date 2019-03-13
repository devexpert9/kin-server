'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var onlinecourseSchema = new Schema({
   
    title : {
      type: String
    },
    hosted_by: {
      type: String
    },
    hosted_name: {
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
    duration: {
      type: String
    },
    time: {
      type: String
    },
    date: {
      type: String
    },
    type: {
      type: String
    },
    joinstatus: {
      type: String
    },
    scheduled:{
      type: Schema.Types.Mixed
    },
    created_on: {
      type: Date
    },
    created_at: {
      type: String
    },
    hosted_name: {
      type: String
    },
    joined_by:{
      type:  Schema.Types.Mixed
    }
});

module.exports = mongoose.model('onlinecourse', onlinecourseSchema);