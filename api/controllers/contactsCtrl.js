'use strict';

var mongoose = require('mongoose'),
multer    = require('multer'),
users     = mongoose.model('users'),
profiles  = mongoose.model('profiles'),
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

exports.addContact = function(req, res)
{
  contacts.findOne({phone: req.body.phone, userId: req.body.userId}, function(err, user)
  {
    if(user == null)
    {
      var new_contact = new contacts({
        name: req.body.name,
        phone: req.body.phone,
        userId: req.body.userId,
        created_on: new Date()
      });
     
      new_contact.save(function(err, contact) {
        res.send({
          data: contact,
          status: 1,
          error: 'New contact added successfully!' 
        });
      });
    }
    else
    {
      res.send({
        status: 0, 
        data: null, 
        error: 'Contact with this phone number is already exist'
      });
    }
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

exports.getContacts = function(req, res)
{
    contacts.find({patientId: req.body.patientId }, function(err, contacts)
    {
      res.json({
         status: 1,
         data: contacts,
         error:null
      });
    });
};

exports.getContactByID = function(req, res)
{
    contacts.find({_id: req.body.contactId }, function(err, contacts)
    {
      res.json({
         status: 1,
         data: contacts,
         error:null
      });
    });
};

exports.deleteContact = function(req, res)
{
    contacts.remove({_id: req.body._id }, function(err, docs)
    {
      res.json({
         status: 1,
         data: null,
         error:"Contact deleted successfully"
      });
    });
};