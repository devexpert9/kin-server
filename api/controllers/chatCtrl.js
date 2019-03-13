'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
group = mongoose.model('group'),
chats = mongoose.model('chat');
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
//****************  add messages ****************************
exports.addchat = function(req, res) {

  group.findOne({_id: req.body.groupid}, function(err, newgroup) {
    console.log(newgroup,"+++");
    if(newgroup != null){
            var new_chat = new chats({
            groupid: req.body.groupid,
            userid: req.body.userid,
            message: req.body.message,
            deletedusers:req.body.deletedusers,
            created_on: new Date(),
              });
            new_chat.save(function(err, save) {
            if(save == null){
              res.send({
                error: err,
                status: 0
              });
            }else{
                res.send({
                 data:save,
                 status: 1
            });

       
            }
          });
      
    }else{
      console.log("else");
      res.send({
        error: 'err',
        status: 0,
        msg: 'Group not exist!'
      });
    }

  })

};
//****************  list messages of particular group ****************************
exports.listchat = function(req, res) {
var data = [];
var counter = 0;
var counter1 = 0;
var counter3 = 0;
  group.findOne({_id: req.body.groupid}, function(err, newgroup) {
    console.log(newgroup,"+++");
    if(newgroup != null){
      chats.find({groupid: req.body.groupid}, function(err, newchats) {
        console.log(newchats);
       if(newchats.length==0){
        res.send({
        status: 0,
        data: []
        });
       }else{
        console.log(newchats[counter3]);
        function showlist(){
        if(newchats[counter3].deletedusers.length!=0){
          function list(){

            
        //   chats.find({groupid:req.body.groupid,userid:newchats[counter3].deletedusers[counter]},function(err, chatdata){
        //   if(chatdata.length != 0){
        //   function chat(){
        //   data.push(chatdata[counter1]);
        //   if(counter1 < chatdata.length-1){
        //     counter1 = counter1+1;
        //     chat();
        //   }else{
        //     counter1 = 0;
        //     if(counter1 < newchats[counter3].deletedusers.length-1){
        //        counter = counter+1;
        //        list();
        //     }else{
        //     counter = 0;
        //     counter3 = counter3+1;
        //     if(counter3 <  newchats.length-1){
        //        showlist();
        //     }else{
        //       res.send({
        //         status: 1,
        //         data: data
        //       });
        //     }
           
        //     }
        //   }
        //   }
        //  chat();
        // }else{
        //     if(counter1 < newchats[counter3].deletedusers.length-1){
        //        counter = counter+1;
        //        list();
        //     }else{
        //         res.send({
        //           status: 1,
        //           data: data
        //         });
        //     }
        // }
        // })
        }
        list();
        }else{
          data.push(newchats[counter3]);
            if(counter3 <  newchats.length-1){
               showlist();
            }else{
              res.send({
                status: 1,
                data: data
              });
            }
        }
       }
       showlist();
       }
     })
    }else{
      console.log("else");
      res.send({
        error: 'err',
        status: 0,
        msg: 'Group not exist!'
      });
    }

  })

};


// //****************  list messages of particular group ****************************
// exports.listchat = function(req, res) {
// var data = [];
// var counter = 0;
// var counter1 = 0;
// var counter3 = 0;
//   group.findOne({_id: req.body.groupid}, function(err, newgroup) {
//     console.log(newgroup,"+++");
//     if(newgroup != null){
//       chats.find({groupid: req.body.groupid}, function(err, newchats) {
//         console.log(newchats);
//        if(newchats.length==0){
//         res.send({
//         status: 0,
//         data: []
//         });
//        }else{
//         console.log(newchats[counter3]);
//         function showlist(){
//         if(newchats[counter3].deletedusers.length!=0){
//           function list(){
//           chats.find({groupid:req.body.groupid,userid:newchats[counter3].deletedusers[counter]},function(err, chatdata){
//           if(chatdata.length != 0){
//           function chat(){
//           data.push(chatdata[counter1]);
//           if(counter1 < chatdata.length-1){
//             counter1 = counter1+1;
//             chat();
//           }else{
//             counter1 = 0;
//             if(counter3 < newchats[counter3].deletedusers.length-1){
//                counter = counter+1;
//                list();
//             }else{
//             counter = 0;
//             counter3 = counter3+1;
//             if(counter3 <  newchats.length-1){
//                showlist();
//             }else{
//               res.send({
//                 status: 1,
//                 data: data
//               });
//             }
           
//             }
//           }
//           }
//          chat();
//         }else{
//             if(counter3 < newchats[counter3].deletedusers.length-1){
//                counter = counter+1;
//                list();
//             }else{
//                 res.send({
//                   status: 1,
//                   data: data
//                 });
//             }
//         }
//         })
//         }
//         list();
//         }else{
//           data.push(newchats[counter3]);
//             if(counter3 <  newchats.length-1){
//                showlist();
//             }else{
//               res.send({
//                 status: 1,
//                 data: data
//               });
//             }
//         }
//        }
//        showlist();
//        }
//      })
//     }else{
//       console.log("else");
//       res.send({
//         error: 'err',
//         status: 0,
//         msg: 'Group not exist!'
//       });
//     }

//   })

// };
