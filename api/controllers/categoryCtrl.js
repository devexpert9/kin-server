'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
Category = mongoose.model('category');
var path = require('path');
 var fs = require('fs');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../images/')
  },
  filename: function(req, file, cb) {
    var fileExtn = file.originalname.split('.').pop(-1);
    cb(null, new Date().getTime() + '.' + fileExtn)
  }
});

exports.upload_image = function(req, res) {
  upload(req, res, function(err){
    if(err){
      res.json({
        status: 0,
        err_desc: err,
        data: null
      });
      return;
    }else{
      res.json({
        status: 1,
        err_desc: null,
        data: req.file.filename
      });
    }
  });
};
//****************  create_user_function ****************************
exports.add_categorty = function(req, res) {
  Category.findOne({'name': req.body.name}, function(err, doc) {
    if(doc == null){
      var cat = new Category({
        name: req.body.name,
        image: req.body.image,
        created_on: new Date(),
        status: 1,
        viewedCount: 0
      });

      cat.save(function(err, doc) {
        if(doc == null){
          res.send({
            error: err,
            status: 0,
            msg: 'Something went wrong.Plesae try later.'
          });
        }else{
          res.send({
            data: doc,
            status: 1,
            msg: 'Category added successfully!'
          });
        }
      });
    }else{
      res.send({
        error: 'err',
        status: 0,
        msg: 'Category alraedy exist.'
      });
    }
  });
};


exports.categorty_exist = function(req, res) {
  Category.findOne({'name': req.body.name, '_id' :{ $ne: req.body._id }}, function(err, doc) {
    if(doc == null){
      res.send({
        error: err,
        status: 1,
        msg: 'Something went wrong.Plesae try later.'
      });
    }else{
      res.send({
        data: doc,
        status: 0,
        msg: 'Category already exist!'
      });
    }
  });
};

exports.category_listing = function(req, res) {
  Category.find({}, null, {sort: {'created_on': -1}}).exec(function(err, doc) {
    if(doc.length==0){
      res.send({
        error: err,
        status: 0,
        data: []
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: doc
      });
    }
  });
};

exports.category_list = function(req, res) {
  //{sort: {'created_on': -1}}
  Category.find({'status': 1}).exec(function(err, doc) {
    Category.find({'status': 1}, null, {limit: 3, sort: {'viewedCount': -1}}).exec(function(err, doc1) {
      console.log(doc1)
      res.send({
        error: null,
        status: 1,
        data: {'cats': doc, 'popular': doc1 }
      });
    });
  });
};

exports.update_view_count = function(req, res){
  Category.update({_id: req.body._id, {$set: {'viewedCount': req.body.viewedCount} }).exec(function(err, doc) {
    res.send({
      error: null,
      status: 1,
      data: doc
    });
  });
};

exports.delete_category = function(req, res) {
  Category.remove({ '_id': req.body._id }, function(err, doc) {
    fs.unlinkSync('/home/bitnami/images/' + req.body.image, function (err) {
    }); 

    res.send({
      error: null,
      status: 1,
      msg: 'Category deleted successfully.'
    });
  });
};

exports.update_category = function(req, res) {
  Category.findOne({ name: req.body.name , '_id' :{ $ne: req.body._id } }, function(err, doc) {
   if(doc != null){
      res.send({
        error: err,
        status: 0,
        msg:'Category already exist.'
      });
    }else{
      Category.update({ '_id': req.body._id }, { $set: { 'name': req.body.name, 'status': req.body.status, 'image': req.body.image, 'viewedCount': req.body.viewedCount} }, {new: true}, function(err, doc) {
        if(doc == null){
          res.send({
            status: 0,
            data: null,
            msg:'Something went wrong.Plesae try later.'
          });

        }else{
          res.json({
             status: 1,
             data: doc,
             msg:'Category updated successfully.'
          });
          if(req.body.oldImage != false){
            fs.unlinkSync('/home/bitnami/images/' + req.body.oldImage, function (err) {
            }); 
          }
          
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