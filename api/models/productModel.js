'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    title : {
      type: String
    },
    tags: {
      type: Array
    },
    link: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    total_items: {
      type: Number
    },
    sizes: {
      type: Array
    },
    created_at: {
      type: String
    },
    buy: {
      type: Array
    },
    catId: {
      type: String
    },
    viewCount: {
      type: Number
    },
    status: {
      type: Number
    }
  });

module.exports = mongoose.model('products', schema);