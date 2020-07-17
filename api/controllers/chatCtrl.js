'use strict';

var mongoose = require('mongoose'),
multer    = require('multer'),
users     	= mongoose.model('users'),
chat  		= mongoose.model('chat');

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

//--- Send Message---------------------------------------
exports.sendMessage = function(req, res)
{
  var new_chat = new chat({
    senderId: 		req.body.senderId,
    receiverId: 	req.body.receiverId,
    media: 			req.body.media,
    text: 			req.body.text,
    senderStatus: 	0,
    receiverStatus: 0,
    created_on: new Date()
  });
 
  new_chat.save(function(err, call)
  {
    res.send({
      data: call,
      status: 1,
      error: 'Message send successfully!' 
    });
  });
};

//--- List Messages---------------------------------------
exports.getChat = function(req, res)
{
    chat.find({
    	$or: [
		    {$and:[{senderId: req.body.userId}, {receiverId: req.body.receiverId}] },
		    {$and:[{senderId: req.body.receiverId}, {receiverId: req.body.userId}] },
 		]
 	}).sort({created_on: 1}, function(err, all_chats)
    {
      var counter = 0,
          data = [],
          dict = {};

      	function getUserDetails()
      	{
	          users.findOne({_id: req.body.receiverId}, function(err, doc)
	          {
	            res.json({
                 status: 1,
                 data: {'chat': all_chats, 'receiver': doc},
                 error:null
              });
	            
	          });
      	};
      getUserDetails();
    });
};


exports.getUsersList = function(req, res){
  users.find({'_id': { $ne: req.body.userId } }, function(err, doc){
     res.json({
         status: 1,
         data: doc,
         error:null
      });
   });
};

