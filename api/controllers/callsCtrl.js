'use strict';

var mongoose = require('mongoose'),
multer    = require('multer'),
users     = mongoose.model('users'),
profiles  = mongoose.model('profiles'),
calls     = mongoose.model('calls'),
contacts  = mongoose.model('contacts');
var path  = require('path');
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
    name: req.body.name,
    userId: req.body.userId,
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

// exports.updateProfile = function(req, res)
// {
//   profiles.findOne({name: req.body.name}, function(err, user) {
//     if(user == null)
//     {
//       profiles.update({_id: req.body._id }, { $set: {name: req.body.name, room: req.body.room, dob: req.body.dob}}, {new: true}, function(err, save)
//       {
//         res.json({
//            status: 1,
//            data: null,
//            error:'Profile updated successfully'
//         });
//       });
//     }
//     else
//     {
//       res.send({
//         status: 0,
//         data: null,
//         error: 'Profile name already exist in your profiles list'
//       });
//     }
//   });
// };

// exports.getProfiles = function(req, res)
// {
//     profiles.find({userId: req.body.userId }, function(err, docs)
//     {
//       res.json({
//          status: 1,
//          data: docs,
//          error:null
//       });
//     });
// };

// exports.deleteProfile = function(req, res)
// {
//     profiles.remove({_id: req.body._id }, function(err, docs)
//     {
//       res.json({
//          status: 1,
//          data: null,
//          error:"Profile deleted successfully"
//       });
//     });
// };