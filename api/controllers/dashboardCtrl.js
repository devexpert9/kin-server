'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
dashboard = mongoose.model('dashboard');
var path = require('path');


// const bcrypt = require('bcrypt');
//****************  create and edit_cmspages_function ****************************
exports.add_dash_section = function(req, res) {
  dashboard.findOne({section: req.body.section, user_id: req.body.user_id }, function(err, doc) {
    if(doc == null){
      var newadd = new dashboard({
            section: req.body.section,
            data: req.body.data,
            user_id: req.body.user_id,
            created_on: new Date(),
            index: req.body.index,
          });

          newadd.save(function(err, save) {
          if(save == null){
            res.send({
              error: err,
              status: 0,
              data: null
            });
          }else{
            res.send({
              error: null,
              status: 1,
              data: req.body.section + 'record has been added successfully!'
            });
          }
      });
    }else{
      dashboard.update({section: req.body.section, user_id: req.body.user_id}, { $set: { section: req.body.section, data: req.body.data}}, {new: true}, function(err, save) {
              if(save == null){
                res.send({
                  status: 0,
                  data: save,
                  msg:'Try Again'
                });

              }else{
                res.json({
                   status: 1,
                   add:0,
                   data: save,
                   msg:'Updated successfully!'
                });
              }
            });
        }
  });
      
};

exports.getPageData = function(req, res) 
{
  console.log(req);
  dashboard.findOne({user_id:req.body.user_id}, function(err, user) {
    if(user == null){
      res.send({
        status: 0,
        data: null,
        error:'Error.'
      });
    }else{
      res.json({
        status: 1,
        data: user,
        error:'Dashboard sections data fetched successfully!'
      });
    }
  });
};