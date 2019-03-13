'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pointSchema = new Schema({
   
    user_id : {
      type: String
    },
    points: {
      type: String
    },
    course_id: {
      type: String
    },
    date: {
      type: Date
    },
    type: {
      type: String
    },
    course_title:{
      type: String
    },
    pointstatus:{
      type: String
    }
});

module.exports = mongoose.model('point', pointSchema);