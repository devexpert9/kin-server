'use strict';

var mongoose = require('mongoose'),
multer 		 = require('multer'),
users 		 = mongoose.model('users'),
patient    = mongoose.model('patient');

var path = require('path');
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


//****************  Add Patient ****************************
exports.patient_add = function(req, res) 
{
	patient.findOne({email: req.body.email}, function(err, user) {
    if(user == null){
      var new_patient = new users({
        userId:    req.body.userId,
        firstname: req.body.firstname,
        lastname:  req.body.lastname,
        email:     req.body.email,
        contact:   req.body.contact,
        password:  req.body.password,
        gender:    req.body.gender,
        room_no:    req.body.room_no,
        image:     null
      });

      new_patient.save(function(err, users) {
        res.send({
          data: users,
          status: 1,
          error: 'Patient added successfully!'
        });
      });
    }else{
      res.send({
        status: 0,
        data: null,
        error: 'Email already exist in our system!'
      });
    }
 	});
};

//**************** Login Patient ******************
exports.patient_login = function(req, res) 
{
  patient.findOne({email:req.body.email, password:req.body.password}, function(err, user)
  {
    if(user == null){
      res.send({
        status: 0,
        data: null,
        error:'Invalid logged in deatils.'
      });
    }
    else
    {
      res.json({
         status: 1,
         data: user,
         error:'Logged In successfully!'
      });
    }
  });
};

//***** Get organization patients*********************
exports.patient_get = function(req, res) 
{
  patient.find({}, function(err, user)
  {
    if(user == null){
      res.send({
        status: 0,
        data: null,
        error:'Invalid logged in deatils.'
      });
    }
    else
    {
      res.json({
         status: 1,
         data: user,
         error:'Patients fetched successfully'
      });
    }
  });
};

//**************** Update Patient ******************
exports.patient_update = function(req, res)
{
  patient.update({_id: req.body.patientId},{$set:{ 'firstname': req.body.firstname, 'lastname': req.body.lastname, 'email':req.body.email, 'contact':req.body.contact, 'gender':req.body.gender, 'room_no': req.body.room_no } }, {new: true}, function(err, user) {
    if(user == null){
      res.send({
        error: err,
        status: 0,
        msg:"Try Again"
      });
    }else{
      res.json({
        error: null,
        status: 1,
        data:user,
        msg:"Patient updated successfully!"
      });
    }
  });
};

//**************** Delete Patient ******************
exports.patient_delete = function(req, res) {
   patient.remove({_id:req.body.patientId}, function(err, user) {
      if(user == null)
      {
        res.send({
          error: err,
          status: 0,
          msg:"Try Again"
        });
      }else{
        res.json({
          error: null,
          status: 1,
          msg:"Deleted Successfully"
        });
      }
    });
};


exports.patient_upload_image = function(req, res) {
  upload(req,res,function(err)
  {
    res.json(req.file.filename);
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }   
  });
};