'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
points = mongoose.model('point'),
Category = mongoose.model('category'),
Product = mongoose.model('products');
var path = require('path');
var Schema = mongoose.Schema;


exports.add_product = function(req, res) {
  var product = new Product({
    title: req.body.title,
    tags: req.body.tags,
    link: req.body.link,
    description: req.body.description,
    sizes: req.body.sizes,
    buy: [],
    created_on: new Date(),
    image: req.body.image,
    total_items: req.body.total_items
    catId: req.body.categortId,
    viewCount: 0,
    status: 1
  });

  product.save(function(err, doc) {
    if(doc == null){
      res.send({
        error: err,
        status: 0,
        data: null,
        msg: 'Something went wrong.Please try later.'
      });
    }else{
      res.send({
        status: 1,
        err: null,
        data: doc,
        msg: 'Product has been added successfully.'
      });
    }
  });
};

exports.is_product_exist = function(req, res) {
  Product.find({'name': req.body.name, 'catId': req.body.categortId }, function(err, doc) {
    if(doc.length == 0){
      res.send({
        error: 'Product under this category already exist with this name.Please try another product name or category.',
        status: 0,
        data: null
      });
    }else{
      res.send({
        error: null,
        status: 1,
        data: null
      });
    }  
  });
};

exports.product_listing = function(req, res) {
  Product.find({ }, null, {sort: {'created_on': -1}}).exec( function(err, doc) {
    var couter = 0,
    dict = {},
    data = [];
    function getCategoryName(){
      if(counter < doc.length){
        Category.findOne({'_id': doc[counter].catId}, function(err, doc1){
          dict = {
            _id: doc[counter]._id,
            description: doc[counter].description,
            sizes: doc[counter].sizes,
            tags: doc[counter].tags,
            link: doc[counter].link,
            title: doc[counter].title,
            buy: doc[counter].buy,
            viewCount: doc[counter].viewCount,
            catId: doc[counter].catId,
            image: doc[counter].image,
            total_items: doc[counter].total_items,
            status: doc[counter].status,
            category_name: doc.name
          };
          data.push(dict);
          counter += 1;
          getCategoryName();
        });
      }else{
        res.send({
          error: null,
          status: 1,
          data: data
        });
      }
    };
  });
};

exports.product_listing_for_buy = function(req, res) {
  Product.find({ 'status': 1, 'catId': req.body.categoryId }, null, {sort: {'created_on': -1}}).exec(function(err, doc) {
    var couter = 0,
    dict = {},
    data = [];
    function getCategoryName(){
      if(counter < doc.length){
        Category.findOne({'_id': doc[counter].catId}, function(err, doc1){
          dict = {
            _id: doc[counter]._id,
            description: doc[counter].description,
            sizes: doc[counter].sizes,
            tags: doc[counter].tags,
            link: doc[counter].link,
            title: doc[counter].title,
            buy: doc[counter].buy,
            viewCount: doc[counter].viewCount,
            catId: doc[counter].catId,
            image: doc[counter].image,
            total_items: doc[counter].total_items,
            status: doc[counter].status,
            category_name: doc.name
          };
          data.push(dict);
          counter += 1;
          getCategoryName();
        });
      }else{
        res.send({
          error: null,
          status: 1,
          data: data
        });
      }
    };
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