'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
points = mongoose.model('point'),
hosts = mongoose.model('hosts'),
users = mongoose.model('users'),
onlinecourses = mongoose.model('onlinecourse');
var path = require('path');
var Schema = mongoose.Schema;

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
exports.addcourse = function(req, res) {
  if(req.body.courseid!=''){
            onlinecourses.update({_id:req.body.courseid}, { $set: 
                    { title: req.body.title,
                      hosted_by: req.body.hosted_by,
                      points: req.body.points,
                      date:req.body.date,
                      duration:req.body.duration,
                      time:req.body.time,
                      description:req.body.description,
                      image:req.body.image,
                      type:req.body.type,
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
                    msg:"Online course has been updated successfully!"
                  });
                }
              });
  }else{
           var new_user = new onlinecourses({
            title: req.body.title,
            hosted_by: req.body.hosted_by,
            points:req.body.points,
            duration:req.body.duration,
            time:req.body.time,
            date:req.body.date,
            type:req.body.type,
            created_at: new Date(),
            created_on: new Date(),
            description: req.body.description,
            image:req.body.image
            });
            new_user.save(function(err, users) {
            if(users == null){
              res.send({
                error: err,
                status: 0
              });
            }else{
                res.send({
                 status: 1,
                 msg: 'Online course has been added successfully!'
            });

       
            }
          });
  }
};
//******************** Online course list ************************
exports.courselist = function(req, res) {
   var data=[];
  var counter = 0,
  dict = {};
  onlinecourses.find({}, null, {sort: {'created_on': -1}}).exec(function(err, course) {
    if(course.length==0){
     res.send({
        error: err,
        status: 0,
        data: []
      });
    }else{
          function getdetail(){
           dict = course[counter];
           console.log(dict.hosted_by);
           hosts.findOne({_id:dict.hosted_by},function(err, host) {
           if(host==null){
            dict.hosted_name = '';
            data.push(dict);
            }else{
              dict.hosted_name = host.firstname+' '+ host.lastname;
            data.push(dict);
           }  
           // data.push(item);
          //  console.log(data, "------------");
         
         if(counter < course.length - 1){
                 counter = counter + 1;
                 getdetail();
        }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
    }
    getdetail();
     
      // res.json({
      //   error: null,
      //   status: 1,
      //   data: course
      // });
    }
  });
};

//******************** Delete course_function ************************
exports.deletecourse = function(req, res) {
  var d = new Date();
  var month =d.getMonth()+1;
  var day=  d.getDate();
  if(day <=9){
  day='0'+day;
  }
  var now = d.getFullYear()+'-'+ month+'-'+day;
  onlinecourses.findOne({_id:req.body.courseid},function(err, course) {
    if(course==null){
      res.send({
          error: err,
          status: 0,
          msg:"Course not found",
        });
    }else{
    // if(course.date>now){
      onlinecourses.remove({_id:req.body.courseid}, function(err, course) {
      if(course == null){
        res.send({
          error: err,
          status: 0,
          msg:"Try Again"
        });
      }else{
        res.json({
          error: null,
          status: 1,
          msg:"Course deleted Successfully"
        });
      }
    });
    // }else{
    //     res.send({
    //       error: err,
    //       status: 0,
    //       msg:"Sorry, You cannot delete this course!"
    //     });
    // }
    }

  })
};
///////// show course list (acc to today date )app /////////////////////
// date:now
//******************** Online course list  for app************************
exports.courselist_now = function(req, res) {
  var data=[];
  var counter = 0,
  dict = {};
  var d = new Date();
  var month =d.getMonth()+1;
  var day=  d.getDate();
  if(day <=9){
  day='0'+day;
  }
  var now = d.getFullYear()+'-'+ month+'-'+day;
  console.log(now);
    onlinecourses.find({date: {$gte: now }}, null, {sort: {'created_on': -1}}).exec(function(err, course) {
  // onlinecourses.find({ date: {$gte: now }}, {$sort: {'created_on': -1}}).exec(function(err, course) {
    console.log(err);
    console.log(course);
  if(course.length==0){
     res.send({
        error: err,
        status: 0,
        datas: []
      });
    }else{
       function getCoursedetail(){
       dict = course[counter];
       console.log(course.length,'length');
       // course.forEach(function(item,key){ 
     hosts.findOne({_id:dict.hosted_by},function(err, host) {
           if(host==null){
            dict.hosted_name = '';
            }else{
              dict.hosted_name = host.firstname+' '+ host.lastname;
            }  
       points.findOne({course_id:dict._id,user_id:req.body.user_id},function(err, point) {
          console.log(point);
           if(point==null){
            dict.joinstatus = 0;
            data.push(dict);
            }else{
            dict.joinstatus = 1;
            data.push(dict);
           }  
           // data.push(item);
          //  console.log(data, "------------");
         
         if(counter < course.length - 1){
                 counter = counter + 1;
                 getCoursedetail();
        }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
     })
    }
    getCoursedetail();
     
  }
  });
};

// date:now
//********************todaya Online course list  for admin************************
exports.today_courselist_now = function(req, res) {
  var data=[];
  var counter = 0,
  dict = {};
  var d = new Date();
  var month =d.getMonth()+1;
  var day=  d.getDate();
  if(day <=9){
  day='0'+day;
  }
  var now = d.getFullYear()+'-'+ month+'-'+day;
  console.log(now);
    onlinecourses.find({date:now}, null, {sort: {'created_on': -1}}).exec(function(err, course) {
  // onlinecourses.find({ date: {$gte: now }}, {$sort: {'created_on': -1}}).exec(function(err, course) {
    console.log(err);
    console.log(course);
  if(course.length==0){
     res.send({
        error: err,
        status: 0,
        datas: []
      });
    }else{
       function getCoursedetail(){
       dict = course[counter];
       console.log(course.length,'length');
       // course.forEach(function(item,key){ 
       points.findOne({course_id:dict._id,user_id:req.body.user_id},function(err, point) {
          console.log(point);
            hosts.findOne({_id:dict.hosted_by},function(err, host) {
           if(host==null){
            dict.hosted_name = '';
            }else{
              dict.hosted_name = host.firstname+' '+ host.lastname;
            }   
             if(point==null){
              dict.joinstatus = 0;
              data.push(dict);
              }else{
              dict.joinstatus = 1;
              data.push(dict);
             } 
               if(counter < course.length - 1){
                 counter = counter + 1;
                 getCoursedetail();
                }else{
                    res.send({
                      status: 1,
                      data: data
                    });
                }
            })
          
           // data.push(item);
          //  console.log(data, "------------");
         
       
        })
    }
    function getdetail(){
           dict = course[counter];
           console.log(dict.hosted_by);
           hosts.findOne({_id:dict.hosted_by},function(err, host) {
           if(host==null){
            dict.hosted_name = '';
            data.push(dict);
            }else{
              dict.hosted_name = host.firstname+' '+ host.lastname;
            data.push(dict);
           }  
           // data.push(item);
          //  console.log(data, "------------");
         
         if(counter < course.length - 1){
                 counter = counter + 1;
                 getdetail();
        }else{
            res.send({
              status: 1,
              data: data
            });
        }
        })
    }
    getCoursedetail();
     
  }
  });
};


//******************** Scheduled online course list ************************
exports.courselist_schedule = function(req, res) {
var counter = 0,dict = {};
var data = [];
var d = new Date();
var month =d.getMonth()+1;
var day=  d.getDate();
if(day <=9){
day='0'+day;
};
var now = d.getFullYear()+'-'+ month+'-'+day;
console.log(now);
onlinecourses.find({'scheduled': {$elemMatch: {'userid': req.body.user_id}}},{'type': req.body.type},function(err, result){
  console.log(result,"+++++++++++");
  if(result.length>0){
      function list(){
              dict = result[counter];
               console.log(dict,"duser_id")
                onlinecourses.findOne({_id: dict._id}, function(err,scheduledcourse) {
                console.log(scheduledcourse.hosted_by,"dsf");
                if(scheduledcourse!=null){
                  // if(!scheduledcourse.scheduled || scheduledcourse.scheduled.length==0 ){
                  //   if(counter < (result.length-1)){
                  //        counter = counter + 1;
                  //      list();
                  //    }else{
                  //         res.send({
                  //         status: 0,
                  //         data: [] 
                  //       });
                  //    }
                  // }else{
                     hosts.findOne({_id:scheduledcourse.hosted_by},function(err, host) {
                    console.log(host);
                   if(host==null){
                      scheduledcourse.hosted_name = '';
                    }else{
                      scheduledcourse.hosted_name =  host.firstname+' '+ host.lastname;
                    }  
                  scheduledcourse.joinstatus = dict.joinstatus;
                    data.unshift(scheduledcourse);
                    if(counter < (result.length-1)){
                         counter = counter + 1;
                       list();
                     }else{
                          res.send({
                          status: 1,
                          data: data 

                        });
                     }
                   })
                  // }

              
                  }
              })
              
            // })
       
        }
        list();
      }else{
                   res.send({
                      status: 0,
                      data: []          
                    });
      }
    
 })

};
// exports.courselist_schedule = function(req, res) {
// var counter = 0,dict = {};
// var data = [];
// var d = new Date();
// var month =d.getMonth()+1;
// var day=  d.getDate();
// if(day <=9){
// day='0'+day;
// };
// var now = d.getFullYear()+'-'+ month+'-'+day;
// console.log(now);
//   onlinecourses.find({'type': req.body.type},function(err, result){
//   console.log(result,"+++++++++++");
//   if(result.length>0){
//       function list(){
//               dict = result[counter];
//               console.log(dict,"duser_id")
//                onlinecourses.findOne({_id: dict._id},{'scheduled': {$elemMatch: {'userid': req.body.user_id}} }, function(err,scheduledcourse1) {
//                 console.log(scheduledcourse1,"dsf");
//                 if(scheduledcourse1!=null){
//                       onlinecourses.findOne({_id: dict._id}, function(err,scheduledcourse) {
//                       hosts.findOne({_id:scheduledcourse.hosted_by},function(err, host) {
//                     console.log(host);
//                    if(host==null){
//                       scheduledcourse.hosted_name = '';
//                     }else{
//                       scheduledcourse.hosted_name =  host.firstname+' '+ host.lastname;
//                     }  
//                      data.unshift(scheduledcourse);
//                     if(counter < (result.length-1)){
//                          counter = counter + 1;
//                        list();
//                      }else{
//                           res.send({
//                           status: 1,
//                           data: data 

//                         });
//                      }
//                    })
//                    })
//                   }else{
//                       if(counter < (result.length-1)){
//                          counter = counter + 1;
//                        list();
//                      }else{
//                           res.send({
//                           status: 0,
//                           data: [] 

//                         });
//                      }
//                   }
//               })
              
          
       
//         }
//         list();
//       }else{
//          res.send({
//                       status: 0,
//                       data: []          
//                     });
//       }
    
//  })

// };
//******************** Scheduled online course list for admin************************
exports.courselist_schedule_admin= function(req, res) {
  var counter = 0,dict = {};
  var data = [];
  // onlinecourses.find({},function(err, result){
  onlinecourses.find({}, null, {sort: {'created_on': -1}}).exec(function(err, result) {

  console.log(result,"+++++++++++",result.length);
  if(result.length>0){
              
      function list(){
              dict = result[counter];
                hosts.findOne({_id:dict.hosted_by},function(err, host) {
                    console.log(host);
                   if(host==null){
                      dict.hosted_name = '';
                    }else{
                      dict.hosted_name =  host.firstname+' '+ host.lastname;
                    }  
                    if(dict.scheduled && dict.scheduled.length>0){
                      data.push(dict);
                  
                    }
                        if(counter < (result.length-1)){
                         counter = counter + 1;
                       list();
                        }else{
                          res.send({
                          status: 1,
                          data: data 
                         });
                     }
                   })
                 }
        list();
      }else{
                   res.send({
                      status: 0,
                      data: []          
                    });
      }
    
 })

};
//******************** Delete scheduled from course  for web  ************************
exports.deletescheduled = function(req, res) {
  onlinecourses.findOne({_id:req.body._id},function(err, course) {
    if(course==null){
      res.send({
          error: err,
          status: 0,
          msg:"Scheduled course not found",
        });
    }else{
      onlinecourses.update({_id:req.body._id}, { $set: { scheduled:[]}}, {new: true}, function(err, course) {
         if(course == null){
        res.send({
          error: err,
          status: 0,
          msg:"Try Again"
        });
      }else{
        res.json({
          error: null,
          status: 1,
          msg:"Scheduled course has been deleted Successfully"
        });
      }
       })
    }
  })
};
//******************** get scheduled by user api for web ************************
exports.scheduledbyuser = function(req, res) {
    var counter = 0,dict = {};
  var data = [];
  onlinecourses.findOne({_id:req.body._id},function(err, result) {
    if(result!=null){
      if(!result.scheduled ||result.scheduled.length==0){
                   res.send({
                      status: 0,
                      data: []          
                    });
      }else{
            function list(){
              dict = result.scheduled[counter];
                users.findOne({_id:dict.userid},function(err, user) {
                    console.log(user);
                   if(user!=null){
                       data.push(user);
                    } 
                   if(counter < (result.scheduled.length-1)){
                         counter = counter + 1;
                         list();
                        }else{
                          res.send({
                          status: 1,
                          data: data 
                         });
                     }
                   })
                 }
        list();
      }
    
      }else{
                   res.send({
                      status: 0,
                      data: []          
                    });
      }
    


  })
};
//******************** get scheduled by user api for web ************************
exports.delete_user_scheduled = function(req, res) {
    // onlinecourses.update({_id:req.body._id}, { $pull: { scheduled :{ userid : req.body.user_id } } },{ multi: true },function(err, obj) {
    onlinecourses.update({_id:req.body._id}, { $pull: {scheduled :{ userid:req.body.user_id} } },{ multi: true },function(err, obj) {
     
        if(obj.nModified==1){
           res.json({
                     status: 1,
                      msg:'Scheduled course has been deleted by user !'
                  });
        }else{
          res.json({
                     status: 0,
                     liked:0,
                      msg:'Please try again.'
                  });
        }
      })
};
//******************** JOINed online course list for admin************************
exports.courselist_joined_admin= function(req, res) {
  var counter = 0,dict = {};
  var data = [];
  // onlinecourses.find({},function(err, result){
  onlinecourses.find({}, null, {sort: {'created_on': -1}}).exec(function(err, result) {

  console.log(result,"+++++++++++",result.length);
  if(result.length>0){
              
      function list(){
              dict = result[counter];
                hosts.findOne({_id:dict.hosted_by},function(err, host) {
                    console.log(host);
                   if(host==null){
                      dict.hosted_name = '';
                    }else{
                      dict.hosted_name =  host.firstname+' '+ host.lastname;
                    }  
                    if(dict.joined_by && dict.joined_by.length>0){
                      data.push(dict);
                  
                    }
                        if(counter < (result.length-1)){
                         counter = counter + 1;
                       list();
                        }else{
                          res.send({
                          status: 1,
                          data: data 
                         });
                     }
                   })
                 }
        list();
      }else{
                   res.send({
                      status: 0,
                      data: []          
                    });
      }
    
 })

};
//******************** Delete jpoined from course  for web  ************************
exports.deletejoined = function(req, res) {
  onlinecourses.findOne({_id:req.body._id},function(err, course) {
    if(course==null){
      res.send({
          error: err,
          status: 0,
          msg:"Scheduled course not found",
        });
    }else{
      onlinecourses.update({_id:req.body._id}, { $set: { joined_by:[]}}, {new: true}, function(err, course) {
         if(course == null){
        res.send({
          error: err,
          status: 0,
          msg:"Try Again"
        });
      }else{
        res.json({
          error: null,
          status: 1,
          msg:"Scheduled course has been deleted Successfully"
        });
      }
       })
    }
  })
};
//******************** get joined by user api for web ************************
exports.joinedbyuser = function(req, res) {
    var counter = 0,dict = {};
  var data = [];
  onlinecourses.findOne({_id:req.body._id},function(err, result) {
    if(result!=null){
      if(!result.joined_by ||result.joined_by.length==0){
                   res.send({
                      status: 0,
                      data: []          
                    });
      }else{
            function list(){
              dict = result.joined_by[counter];
                users.findOne({_id:dict.userid},function(err, user) {
                    console.log(user);
                    console.log(counter, "+++++",result.joined_by.length-1)
                   if(user!=null){
                       data.push(user);
                    } 
                   if(counter < (result.joined_by.length-1)){
                    console.log("if");
                         counter = counter + 1;
                         list();
                        }else{
                    console.log("else");
                          res.send({
                          status: 1,
                          data: data 
                         });
                     }
                   })
                 }
        list();
      }
    
      }else{
                   res.send({
                      status: 0,
                      data: []          
                    });
      }
    
  })
};
//******************** get scheduled by user api for web ************************
exports.delete_user_joined = function(req, res) {
    // onlinecourses.update({_id:req.body._id}, { $pull: { scheduled :{ userid : req.body.user_id } } },{ multi: true },function(err, obj) {
    onlinecourses.update({_id:req.body._id}, { $pull: {joined_by :{ userid:req.body.user_id} } },{ multi: true },function(err, obj) {
     
        if(obj.nModified==1){
           res.json({
                     status: 1,
                      msg:'Joined course has been deleted by user !'
                  });
        }else{
          res.json({
                     status: 0,
                     liked:0,
                      msg:'Please try again.'
                  });
        }
      })
};
// db.onlinecourses.update({"_id":ObjectId("5bfea6c58103d858c14f1623")},{ $pull: { "scheduled": { "userid":"5bf2718e20c36c0501ab501c"} } },{ multi: true })