'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
stores = mongoose.model('store'),
points = mongoose.model('point');
var path = require('path');


// var storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//        cb(null, '../images/')
//    },
//    filename: function(req, file, cb) {
//        var fileName = file.originalname.split('.');
//        cb(null, fileName[0] + '-' + Date.now() + '.jpg')
//    }
// });

var storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, '../images/')
   },
   filename: function(req, file, cb) {
       ////console.log('file.originalname')
       var fileExtn = file.originalname.split('.').pop(-1);
       cb(null, new Date().getTime() + '.' + fileExtn)
       // var fileName = file.originalname.split('.');
       // cb(null, fileName[0] + '-' + Date.now() + '.jpg')
       // ////console.log('filename', fileName)
   }
});
var upload = multer({ storage: storage }).single('image');

// const bcrypt = require('bcrypt');
//****************  create_user_function ****************************
exports.addstore = function(req, res) {
  if(req.body.storeid!=''){
            stores.update({_id:req.body.storeid}, { $set: 
                    { title: req.body.title,
                      points: req.body.points,
                      description:req.body.description,
                      image:req.body.image,
                      // created_at: new Date(),
                      // created_on: new Date(),
                    }}, {new: true}, function(err, updated) {
                   if(updated == null){
                  res.send({
                    error: err,
                    status: 0,
                    msg:"Try Again"
                  });
                }else{
                  res.json({
                    error: null,
                    status: 1,
                    data:updated,
                    msg:"Product has been updated successfully!"
                  });
                }
              });
  }else{
           var new_store = new stores({
            title: req.body.title,
            points:req.body.points,
            created_at: new Date(),
            created_on: new Date(),
            description: req.body.description,
            image:req.body.image
            });
            new_store.save(function(err, users) {
            if(users == null){
              res.send({
                error: err,
                status: 0
              });
            }else{
                res.send({
                 status: 1,
                 msg: 'Product has been added successfully!'
            });

       
            }
          });
  }
};
//******************** Online course list ************************
 

exports.storelist = function(req, res) {
  // stores.find({ },function(err, store) {
     stores.find({}, null, {sort: {'created_on': -1}},function(err, store) {
    if(store.length==0){
     res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
      res.json({
        error: null,
        status: 1,
        data: store
      });
    }
  });
};

//******************** Delete course_function ************************
exports.deletestore = function(req, res) {
      stores.remove({_id:req.body.userid}, function(err, course) {
      if(course == null){
        res.send({
          error: err,
          status: 0,
          msg:"Try Again"
        });
      }else{
        points.remove({course_id:req.body.userid})
        res.json({
          error: null,
          status: 1,
          msg:"Deleted Successfully"
        });
      }
    });

};
