'use strict';

var mongoose = require('mongoose'),
multer    = require('multer'),
users     = mongoose.model('users'),
profiles  = mongoose.model('profiles'),
calls     = mongoose.model('calls'),
contacts  = mongoose.model('contacts');
var path  = require('path');
var patient    = mongoose.model('patient');
var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, '../images/')
   },
   filename: function(req, file, cb) {
        var fileExtn = file.originalname.split('.').pop(-1);
       cb(null, new Date().getTime() + '.' + fileExtn)
   }
});
var upload = multer({ storage: storage }).single('image');

exports.addCall = function(req, res)
{
  var new_call = new calls({
    contactId:  req.body.contactId,
    callDate:   req.body.date,
    callTime:   req.body.time,
    // userId:     req.body.userId,
    patientId:  req.body.patientId,
    created_on: new Date()
  });
 
  new_call.save(function(err, call)
  {
    res.send({
      data: call,
      status: 1,
      error: 'New call scheduled successfully!' 
    });
  });
};


exports.getCalls = function(req, res)
{
    calls.find({patientId: req.body.patientId }, function(err, all_calls)
    {
      var counter = 0,
          data = [],
          dict = {};

      function getUserDetails(){
        if(counter < all_calls.length)
        {
          contacts.findOne({_id: all_calls[counter].contactId}, function(err, doc)
          {
            if(doc){
              dict = {
                id: all_calls[counter]._id,
                contactId: all_calls[counter].contactId,
                contactName: doc.name,
                contactEmail: doc.email,
                contactUserId: doc._id,
                isAppUser: doc.isAppUser,
                callDate: all_calls[counter].callDate,
                callTime: all_calls[counter].callTime,
                // userId: all_calls[counter].userId,
                patientId: all_calls[counter].patientId,
                created_on: all_calls[counter].created_on
              };
              data.push(dict);
            }
            
            counter = counter + 1;
            getUserDetails();
          });
        }else{
          res.json({
             status: 1,
             data: data,
             error:null
          });
        }
      };
      getUserDetails();
    });
};

exports.getCallsForContact = function(req, res)
{
  contacts.findOne({'_id': req.body.patientId}, function(err, contact){
    patient.findOne({'_id': contact.patientId}, function(err, patientData){
      // console.log(req.body.data._id);return false;
      calls.find({'patientId': contact.patientId, 'contactId': contact._id }, function(err, all_calls)
      {
        var counter = 0,
            data = [],
            dict = {};

        function getUserDetails(){
          if(counter < all_calls.length)
          {
            dict = {
              id: all_calls[counter]._id,
              contactId: all_calls[counter].contactId,
              contactName: contact.name,
              callDate: all_calls[counter].callDate,
              callTime: all_calls[counter].callTime,
              // userId: all_calls[counter].userId,
              patientId: all_calls[counter].patientId,
              patientData: patientData,
              created_on: all_calls[counter].created_on
            };
            data.push(dict);
              
            counter = counter + 1;
            getUserDetails();
          }else{
            res.json({
               status: 1,
               data: data,
               error:null
            });
          }
        };
        getUserDetails();
      });
    })
  })
};

exports.getProfileCalls = function(req, res)
{
    calls.find({userId: req.body.userId, profileId: req.body.profileId }, function(err, all_calls)
    {
      if(all_calls)
      {
        var counter = 0,
          data = [],
          dict = {};

        function getUserDetails()
        {
          if(counter < all_calls.length)
          {
            contacts.findOne({_id: all_calls[counter].contactId}, function(err, doc)
            {
              dict = {
                id: all_calls[counter]._id,
                contactId: all_calls[counter].contactId,
                contactName: doc.name,
                callDate: all_calls[counter].callDate,
                callTime: all_calls[counter].callTime,
                userId: all_calls[counter].userId,
                profileId: all_calls[counter].profileId,
                created_on: all_calls[counter].created_on
              };
              data.push(dict);
              counter = counter + 1;
              getUserDetails();
            });
          }else{
            res.json({
               status: 1,
               data: data,
               error:null
            });
          }
        };
        getUserDetails();
      }
      else{
        res.json({
               status: 1,
               data: data,
               error:null
            });
      }
    });
};


exports.deleteCall = function(req, res)
{
    calls.remove({_id: req.body._id }, function(err, docs)
    {
      res.json({
         status: 1,
         data: null,
         error:"Call deleted successfully"
      });
    });
};