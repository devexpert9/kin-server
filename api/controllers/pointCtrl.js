'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
onlinecourses = mongoose.model('onlinecourse'),
users = mongoose.model('users'),
stores = mongoose.model('store'),
points = mongoose.model('point');
var path = require('path');

//****************  create_points_and_ buy store function ****************************
// exports.addpoints = function(req, res) {
//  // points.findOne({course_id: req.body.course_id, user_id:req.body.user_id}, function(err, course) {
//  //  if(course==null){
//     if(req.body.type=='0'){  /*for add join online course*/
//     //      var new_point = new points({
//     //         course_id: req.body.course_id,
//     //         user_id:req.body.user_id,
//     //         points:req.body.points,
//     //         date: new Date(),
//     //         type:req.body.type,
//     //         });
//     //         new_point.save(function(err, point) {
//             users.findOne({_id:req.body.user_id}, function(err, user) {
//             if(user!=null){
//             console.log(user.totalpoints);
//             if(user.totalpoints==null){
//               user.totalpoints=0;
//             }
//             var total_points=Number(user.totalpoints)+Number(req.body.points);
//             users.update({_id: req.body.user_id}, { $set: { totalpoints: total_points}}, {new: true}, function(err, task) {
//             // if(point == null){
//             //   res.send({
//             //     error: err,
//             //     data:null,
//             //     status: 0
//             //   });
//             // }else{
//               users.findOne({_id: req.body.user_id}, function(err, user) {
//               onlinecourses.update({_id:req.body.course_id},{$push: {scheduled: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
//               res.send({
//                  status: 1,
//                  data:user,
//                  msg: 'Added successfully!'
//               });
//               })
//               })
//             // }
//             })
//             }
//             })
//       // });
//     }else if(req.body.type=='1'){ /*for buy store */
//           // var new_point = new points({
//           //   course_id: req.body.course_id,
//           //   user_id:req.body.user_id,
//           //   points:req.body.points,
//           //   date: new Date(),
//           //   type:req.body.type,
//           //   });
//           //   new_point.save(function(err, point) {
//             users.findOne({_id:req.body.user_id}, function(err, user) {
//             if(user!=null){
//               if(Number(user.totalpoints)< Number(req.body.points)){
//                    var total_points=0;
//               }else{
//                    var total_points=Number(user.totalpoints) - Number(req.body.points);
//               }
         
//             users.update({_id: req.body.user_id}, { $set: { totalpoints: total_points}}, {new: true}, function(err, task) {
//             // if(point == null){
//             //   res.send({
//             //     error: err,
//             //     data:null,
//             //     status: 0
//             //   });
//             // }else{
//               users.findOne({_id: req.body.user_id}, function(err, user) {
//                  res.send({
//                  status: 1,
//                  data:user,
//                  msg: 'Added successfully!'
//                });
//               })
//               // }
//             })
//             }
//           })
//       // })
//     }
      
//   // }else{
//   //        res.send({
//   //               error: err,
//   //               status: 0,
//   //               msg: "Already added"
//   //             });
//   // }
   
      
 
// // })
// };
exports.addpoints = function(req, res) {
    onlinecourses.update({_id:req.body.course_id},{$push: {scheduled: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
             if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
              res.send({
                 status: 1,
                 msg: 'Added successfully!'
              });
            }
              })
          
};
//****************  get_points_function ****************************

exports.getpoints = function(req, res) {
  var data=[];
  var counter = 0,
  dict = {};
   points.find({type: req.body.type, user_id:req.body.user_id}, null, {sort: {'date': -1}}).exec(function(err, point) {
   // points.find({type: req.body.type, user_id:req.body.user_id}, function(err, point) {
    console.log(point.length,"+++++");
    if(point.length>0){
      if(req.body.type=='0'){
         earnedpoints();
      }else if(req.body.type=='1'){
         spentpoints();
      }
     function earnedpoints(){
          dict = point[counter];
          onlinecourses.findOne({_id: dict.course_id}, function(err, course) {
            console.log(course, "courseeeeeeeeee")
          if(course!=null){
             dict.course_title = course.title;
             data.push(dict);
          }
         if(counter < point.length - 1){
                 counter = counter + 1;
                 earnedpoints();
         }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
       };
    function spentpoints(){
          dict = point[counter];
          stores.findOne({_id: dict.course_id}, function(err, course) {
            console.log(course, "courseeeeeeeeee")
          if(course!=null){
             dict.course_title = course.title;
             data.push(dict);
          }
         if(counter < point.length - 1){
                 counter = counter + 1;
                 spentpoints();
         }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
       };
    }else{
         res.send({
                error: err,
                status: 0,
                data: null
        });
  }
})
};
exports.addpoints_join = function(req, res) {
  if(req.body.type=='0'){  /*for add join online course*/
    onlinecourses.update({_id:req.body.id},{$push: {joined_by: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
           if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
            var new_point = new points({
            course_id: req.body.id,
            user_id:req.body.user_id,
            points:req.body.points,
            date: new Date(),
            type:req.body.type,
            });
            new_point.save(function(err, point) {
            users.findOne({_id:req.body.user_id}, function(err, user) {
            if(user!=null){
            console.log(user.totalpoints);
            if(user.totalpoints==null){
                user.totalpoints=0;
              }
            var total_points=Number(user.totalpoints)+Number(req.body.points);
            users.update({_id: req.body.user_id}, { $set: { totalpoints: total_points}}, {new: true}, function(err, task) {
          if(point == null){
              res.send({
                error: err,
                data:[],
                status: 0
              });
            }else{
              users.findOne({_id: req.body.user_id}, function(err, user) {
              // onlinecourses.update({_id:req.body.id},{$push: {scheduled: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
              res.send({
                 status: 1,
                 data:user,
                 msg: 'Added successfully!'
              });
              // })
              })
            }

           })
            }
           })
         });
       }

         })
  }else{
        // onlinecourses.update({_id:req.body.id},{$push: {joined_by: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
        //    if(err){
        //        res.json({
        //            status: 0,
        //            msg:'Try Again'
        //         });
        //     }else{
            var new_point = new points({
            course_id: req.body.id,
            user_id:req.body.user_id,
            points:req.body.points,
            date: new Date(),
            type:req.body.type,
            });
            new_point.save(function(err, point) {
            users.findOne({_id:req.body.user_id}, function(err, user) {
            if(user!=null){
            console.log(user.totalpoints);
            if(user.totalpoints==null){
              user.totalpoints=0;
            }else{
              if(Number(user.totalpoints)< Number(req.body.points)){
                   var total_points=0;
              }else{
                   var total_points=Number(user.totalpoints) - Number(req.body.points);
              }
            }
             
            users.update({_id: req.body.user_id}, { $set: { totalpoints: total_points}}, {new: true}, function(err, task) {
            if(point == null){
              res.send({
                error: err,
                data:null,
                status: 0
              });
            }else{
              users.findOne({_id: req.body.user_id}, function(err, user) {
              // onlinecourses.update({_id:req.body.id},{$push: {scheduled: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
              res.send({
                 status: 1,
                 data:user,
                 msg: 'Added successfully!'
              });
              // })
              })
            }
            })
            }
            })
      });
       // }

         // })
  }
 };
 //****************  get_points_ admin function admin ****************************

exports.getallpoints = function(req, res) {
  var data=[];
  var counter = 0,
  dict = {};
   points.find({user_id:req.body.user_id}, null, {sort: {'date': -1}}).exec(function(err, point) {
   // points.find({type: req.body.type, user_id:req.body.user_id}, function(err, point) {
    console.log(point.length,"+++++");
    if(point.length>0){
       function points(){
          dict = point[counter];
          console.log(dict.course_id,"courseid")
          onlinecourses.findOne({_id: dict.course_id}, function(err, course) {
            console.log(course, "courseeeeeeeeee")
          if(course!=null){
             dict.course_title = course.title;
             dict.pointstatus = "0";  /*for earned*/
             data.push(dict);
               if(counter < point.length - 1){
                 counter = counter + 1;
                 points();
                 }else{
                    res.send({
                      status: 1,
                      data: data
                    });
                }
          }else{ 
            console.log(counter,"counter");
            stores.findOne({_id: dict.course_id}, function(err, courses) {
                 if(courses!=null){
                 dict.course_title = courses.title;
                 dict.pointstatus = "1"; /*for spent*/
                 data.push(dict);
              }
                if(counter < point.length - 1){
                 counter = counter + 1;
                 points();
                 }else{
                    res.send({
                      status: 1,
                      data: data
                    });
                }
           })
          }
       
        })
       };
       points();

    }else{
         res.send({
                error: err,
                status: 0,
                data: null
        });
  }
})
};

//****************  get_earned_spent_points_admin function ****************************

exports.get_earned_spent_points = function(req, res) {
  var data=[];
  var counter = 0,
  dict = {};
   points.find({type: req.body.type,user_id:req.body.user_id}, null, {sort: {'date': -1}}).exec(function(err, point) {
   // points.find({type: req.body.type, user_id:req.body.user_id}, function(err, point) {
    console.log(point.length,"+++++");
    if(point.length>0){
      if(req.body.type=='0'){
         earnedpoints();
      }else if(req.body.type=='1'){
         spentpoints();
      }
     function earnedpoints(){
          dict = point[counter];
          onlinecourses.findOne({_id: dict.course_id}, function(err, course) {
            console.log(course, "courseeeeeeeeee")
          if(course!=null){
             dict.course_title = course.title;
             dict.pointstatus="0";
             data.push(dict);
          }
         if(counter < point.length - 1){
                 counter = counter + 1;
                 earnedpoints();
         }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
       };
    function spentpoints(){
          dict = point[counter];
          stores.findOne({_id: dict.course_id}, function(err, course) {
            console.log(course, "courseeeeeeeeee")
          if(course!=null){
             dict.course_title = course.title;
             dict.pointstatus="1";
             data.push(dict);
          }
         if(counter < point.length - 1){
                 counter = counter + 1;
                 spentpoints();
         }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
       };
    }else{
         res.send({
                error: err,
                status: 0,
                data: null
        });
  }
})
};
 // exports.addpoints_join = function(req, res) {
 //           var new_point = new points({
 //            course_id: req.body.course_id,
 //            user_id:req.body.user_id,
 //            points:req.body.points,
 //            date: new Date(),
 //            type:req.body.type,
 //            });
 //            new_point.save(function(err, point) {
 //            users.findOne({_id:req.body.user_id}, function(err, user) {
 //            if(user!=null){
 //            console.log(user.totalpoints);
 //            if(user.totalpoints==null){
 //              user.totalpoints=0;
 //            }
 //            var total_points=Number(user.totalpoints)+Number(req.body.points);
 //            users.update({_id: req.body.user_id}, { $set: { totalpoints: total_points}}, {new: true}, function(err, task) {
 //            if(point == null){
 //              res.send({
 //                error: err,
 //                data:null,
 //                status: 0
 //              });
 //            }else{
 //              users.findOne({_id: req.body.user_id}, function(err, user) {
 //              onlinecourses.update({_id:req.body.course_id},{$push: {scheduled: {$each:[{userid:req.body.user_id}]}}},{safe: true, upsert: true},function(err, doc) {
 //              res.send({
 //                 status: 1,
 //                 data:user,
 //                 msg: 'Added successfully!'
 //              });
 //              })
 //              })
 //            }
 //            })
 //            }
 //            })
 //      });

 // };
//****************  get_spent_points_function ****************************

// exports.getspentSpoints = function(req, res) {
//   var data=[];
//   var counter = 0,
//   dict = {};
//    points.find({type: req.body.type, user_id:req.body.user_id}, function(err, point) {
//     console.log(point.length,"+++++");
//     if(point.length>0){
      
//       function spentpoints(){
//           dict = point[counter];
//           stores.findOne({_id: dict.course_id}, function(err, course) {
//             console.log(course, "courseeeeeeeeee")
//           if(course!=null){
//              dict.course_title = course.title;
//              data.push(dict);
//           }
//          if(counter < point.length - 1){
//                  counter = counter + 1;
//                  points();
//          }else{
//             res.send({
//               status: 1,
//               data: data
//             });
//         }
//         })
//        };
//   spentpoints();
//     }else{
//          res.send({
//                 error: err,
//                 status: 0,
//                 data: null
//         });
//   }
// })
// };