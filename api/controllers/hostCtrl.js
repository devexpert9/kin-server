'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
hosts = mongoose.model('hosts');
var path = require('path');


// const bcrypt = require('bcrypt');
//****************  create_user_function ****************************
exports.add_host = function(req, res) {
  hosts.findOne({email: req.body.email}, function(err, user) {
    console.log(user,"+++");
    if(user == null){
      console.log("iff");
            var new_user = new hosts({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            contact: req.body.contact,
            address:req.body.address,
            created_on: new Date(),
            status:1
            });
            new_user.save(function(err, users) {
            if(users == null){
              res.send({
                error: err,
                status: 0,
                 msg: 'Try again'
              });
            }else{
                res.send({
                 data:users,
                 status: 1,
                 msg: 'Host registered successfully!'
            });

       
            }
          });
      
    }else{
      console.log("else");
      res.send({
        error: 'err',
        status: 0,
        msg: 'Email alraedy exist!'
      });
    }

  })

};
exports.host_listing = function(req, res) {
    hosts.find({}, null, {sort: {'created_on': -1}}).exec(function(err, user) {
        if(user.length==0){
          res.send({
            error: err,
            status: 0,
            data: []
          });
        }else{
            res.send({
            status: 1,
            data:user
            });
        }
        })
  
};
exports.host_edit = function(req, res) {
  hosts.findOne({_id:req.body._id}, function(err, user) {
    console.log(user);
   if(user == null){
      res.send({
        error: err,
        status: 0,
        msg:'Inavlid Host!'
        });
    }else{
         hosts.update({_id: user._id }, { $set: {firstname: req.body.firstname,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          contact: req.body.contact,
          address:req.body.address,

      }}, {new: true}, function(err, save) {
              if(save == null){
                res.send({
                  status: 1,
                  data: user,
                  msg:'Try again'
                });

              }else{
                res.json({
                   status: 1,
                   data: user,
                   msg:'Host updated successfully'
                });
              }
            });
        }
  });
};
exports.edit_status = function(req, res) {
  hosts.findOne({_id:req.body._id}, function(err, user) {
    console.log(user);
   if(user == null){
      res.send({
        error: err,
        status: 0,
        msg:'Inavlid Host!'
        });
    }else{
         hosts.update({_id: user._id }, { $set: {status: req.body.status}}, {new: true}, function(err, save) {
              if(save == null){
                res.send({
                  status: 1,
                  data: user,
                  msg:'Try again'
                });

              }else{
                  hosts.findOne({_id:req.body._id}, function(err, again) {
                      res.json({
                         status: 1,
                         data: again,
                         //msg:'Host activated successfully'
                      });
                  })
               }
            });
        }
  });
};
exports.host_listing_course = function(req, res) {
    hosts.find({status:'1'}, null, {sort: {'created_on': -1}}).exec(function(err, user) {
        if(user.length==0){
          res.send({
            error: err,
            status: 0,
            data: []
          });
        }else{
            res.send({
            status: 1,
            data:user
            });
        }
        })
  
};