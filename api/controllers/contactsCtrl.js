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
  contacts.findOne({phone: req.body.phone, patientId: req.body.patientId}, function(err, user)
  {
    if(user == null)
    {
      var new_contact = new contacts({
        name:       req.body.name,
        phone:      req.body.phone,
        email:      req.body.email,
        password:      req.body.password,
        patientId:  req.body.patientId,
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

exports.updateContact = function(req, res)
{
  contacts.findOne({phone: req.body.phone}, function(err, user)
  {
    if(user == null)
    {
      contacts.update({_id: req.body.contactId }, { $set: {name: req.body.name, email: req.body.email, phone: req.body.phone}}, {new: true}, function(err, save)
      {
        res.json({
           status: 1,
           data: null,
           error:'Contact updated successfully'
        });
      });
    }
    else
    {
      res.send({
        status: 0,
        data: null,
        error: 'Contact with this phone number already exist.'
      });
    }
  });
};

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