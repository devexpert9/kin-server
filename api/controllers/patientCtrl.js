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


//****************  create_user_function ****************************
exports.patient_add = function(req, res) 
{
  	patient.findOne({email: req.body.email}, function(err, user) {
	    if(user == null){
	      var new_patient = new users({
	        userId: req.body.userId,
          firstname: req.body.firstname,
	        lastname: req.body.lastname,
	        email: req.body.email,
	        password: req.body.password,
	        gender: req.body.gender,
	        image: null
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

//**************** User_login_function ******************
exports.patient_login = function(req, res) 
{
  organization.findOne({email:req.body.email, password:req.body.password}, function(err, user)
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