'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmspageSchema = new Schema({
   
    type : {
      type: String
    },
    aboutus: {
      type: Schema.Types.Mixed
    },
    articles: {
      type: Schema.Types.Mixed 
    },
    vedios: {
      type: Schema.Types.Mixed
    },

});

module.exports = mongoose.model('cmspages', cmspageSchema);