'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
users= mongoose.model('users'),
newsfeed = mongoose.model('newsfeed');
var path = require('path');
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
//****************  create_newsfeeds_function ****************************
exports.addfeed = function(req, res) {
            var new_feed = new newsfeed({
            title: req.body.title,
            user_id:req.body.user_id,
            created_at: new Date(),
            created_on: new Date(),
            location:req.body.location,
            image:req.body.image,
            vedio:req.body.vedio
            });
            new_feed.save(function(err, feed) {
            if(feed == null){
              res.send({
                error: err,
                status: 0
              });
            }else{
                res.send({
                 status: 1,
                 data:feed,
                 msg: 'Added successfully!'
            });

       
            }
 });

};
// //**************** get_newsfeeds_function ****************************
// exports.getnews = function(req, res) {
//   var data=[];
//   var counter = 0,
//   counter1 = 0,
//   dict = {},
//   comm = {};
//   var perPage =5;
//   var page =req.body.page;
//   newsfeed.find({}, null, {sort: {'created_on': -1}})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, news) {
//          console.log("checkk");
//          console.log(news.length,"newslength");
//        if(news.length>0){
//           function list(){
//             dict = news[counter];
//             console.log(counter,"oooooooooooooooooooooooooooooooo",dict.user_id)
//             users.findOne({_id: dict.user_id}, function(err, user) {
//             if(user!=null){
//                dict.user_image = user.image;
//                  dict.user_name = user.firstname+' '+user.lastname ;
              
//                  if(dict.comments && dict.comments.length>0){
//                   console.log(dict.comments,"dfffffff")
//                   counter1=0;
//                   data.push(dict);
//                   commentdata(dict);
//                  }else{
//                   console.log(news.length,"else", counter,news.length-1)
//                   data.push(dict);
//                   if(counter < (news.length-1)){
//                      counter = counter + 1;
//                    list();
//                  }else{
//                       res.send({
//                       status: 1,
//                       data: data,
//                       // data1:data1,
//                       current: page                
//                     });
//                  }
//                }
              
              
//             }
//           })
//          };
//          function commentdata(dict){
//           comm = dict.comments[counter1];
//           console.log("enter")
//           console.log(dict.comments,"siiiiiii",counter1)
//           console.log(comm, "comm");
//           console.log(counter1,"=======================================",comm.userid)
//           users.findOne({_id:comm.userid}, function(err, users) {
//              if(users!=null){
//                comm.user_image = users.image;
//                comm.user_name = users.firstname+' '+users.lastname ;
//                console.log(comm,"coooooo",dict.comments.length,"length");
//                if(comm.userid== req.body.user_id ||  req.body.user_id == dict.user_id){
//                 comm.showdelete=1;
//                }else{
//                 comm.showdelete=0;
//                }
//                // data1.push(comm);
//                 if(counter1 < (dict.comments.length-1) && counter1 != dict.comments.length-1){
//                 console.log("+++++++++++++++++++",counter1)
//                 counter1 = counter1 + 1;
//                 commentdata(dict);
//                }else{
//                if(counter < (news.length-1) /*&& counter != (news.length-1)*/){
//                    counter = counter + 1;
//                    list();
//                  }else{
//                       res.send({
//                       status: 1,
//                       data: data,
//                       // data1:data1,
//                       current: page                
//                     });
//              }
//            }
//          }
//           })
//          }
//          list();
//         }else{
//           res.send({
//               status: 0,
//               data: data
//             });
//         }
          
//         })

// };


//**************** get_newsfeeds_function ****************************
exports.getnews = function(req, res) {
  var user_counter = 0,
  user_dict = {};
  var data1=[];
  var data=[];
  var counter = 0,
  counter1 = 0,
  dict = {},
  comm = {};
  var perPage =5;
  var page =req.body.page;
  users.find({'followers': {$elemMatch: {'userid': req.body.user_id}}},function(err, userdata){
    console.log(userdata);
      data1.push(req.body.user_id);
    if(userdata.length>0){
      function usersss(){
        user_dict = userdata[user_counter];
         data1.push(user_dict._id);
         if(user_counter < (userdata.length-1)){
                user_counter = user_counter + 1;
                usersss();
          }else{
         newsfeed.find({user_id:data1}, null, {sort: {'created_on': -1}})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, news) {
         console.log("checkk");
         console.log(news.length,"newslength");
       if(news.length>0){
          function list(){
            dict = news[counter];
            console.log(counter,"oooooooooooooooooooooooooooooooo",dict.user_id)
            users.findOne({_id: dict.user_id}, function(err, user) {
            if(user!=null){
               dict.user_image = user.image;
                 dict.user_name = user.firstname+' '+user.lastname ;
              
                 if(dict.comments && dict.comments.length>0){
                  console.log(dict.comments,"dfffffff")
                  counter1=0;
                  data.push(dict);
                  commentdata(dict);
                 }else{
                  console.log(news.length,"else", counter,news.length-1)
                  data.push(dict);
                  if(counter < (news.length-1)){
                     counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                      // data1:data1,
                      current: page                
                    });
                 }
               }
              
              
            }
          })
         };
         function commentdata(dict){
          comm = dict.comments[counter1];
          console.log("enter")
          console.log(dict.comments,"siiiiiii",counter1)
          console.log(comm, "comm");
          console.log(counter1,"=======================================",comm.userid)
          users.findOne({_id:comm.userid}, function(err, users) {
             if(users!=null){
               comm.user_image = users.image;
               comm.user_name = users.firstname+' '+users.lastname ;
               console.log(comm,"coooooo",dict.comments.length,"length");
               if(comm.userid== req.body.user_id ||  req.body.user_id == dict.user_id){
                comm.showdelete=1;
               }else{
                comm.showdelete=0;
               }
               // data1.push(comm);
                if(counter1 < (dict.comments.length-1) && counter1 != dict.comments.length-1){
                console.log("+++++++++++++++++++",counter1)
                counter1 = counter1 + 1;
                commentdata(dict);
               }else{
               if(counter < (news.length-1) /*&& counter != (news.length-1)*/){
                   counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                      // data1:data1,
                      current: page                
                    });
             }
           }
         }
          })
         }
         list();
        }else{
          res.send({
              status: 0,
              data: data
            });
        }
          
        })
          }
      }
      usersss()
   }else{
          function usersss(){
      newsfeed.find({user_id:data1}, null, {sort: {'created_on': -1}})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, news) {
         console.log("checkk");
         console.log(news.length,"newslength");
       if(news.length>0){
          function list(){
            dict = news[counter];
            console.log(counter,"oooooooooooooooooooooooooooooooo",dict.user_id)
            users.findOne({_id: dict.user_id}, function(err, user) {
            if(user!=null){
               dict.user_image = user.image;
                 dict.user_name = user.firstname+' '+user.lastname ;
              
                 if(dict.comments && dict.comments.length>0){
                  console.log(dict.comments,"dfffffff")
                  counter1=0;
                  data.push(dict);
                  commentdata(dict);
                 }else{
                  console.log(news.length,"else", counter,news.length-1)
                  data.push(dict);
                  if(counter < (news.length-1)){
                     counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                      // data1:data1,
                      current: page                
                    });
                 }
               }
              
              
            }
          })
         };
         function commentdata(dict){
          comm = dict.comments[counter1];
          console.log("enter")
          console.log(dict.comments,"siiiiiii",counter1)
          console.log(comm, "comm");
          console.log(counter1,"=======================================",comm.userid)
          users.findOne({_id:comm.userid}, function(err, users) {
             if(users!=null){
               comm.user_image = users.image;
               comm.user_name = users.firstname+' '+users.lastname ;
               console.log(comm,"coooooo",dict.comments.length,"length");
               if(comm.userid== req.body.user_id ||  req.body.user_id == dict.user_id){
                comm.showdelete=1;
               }else{
                comm.showdelete=0;
               }
               // data1.push(comm);
                if(counter1 < (dict.comments.length-1) && counter1 != dict.comments.length-1){
                console.log("+++++++++++++++++++",counter1)
                counter1 = counter1 + 1;
                commentdata(dict);
               }else{
               if(counter < (news.length-1) /*&& counter != (news.length-1)*/){
                   counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                      // data1:data1,
                      current: page                
                    });
             }
           }
         }
          })
         }
         list();
        }else{
          res.send({
              status: 0,
              data: data
            });
        }
          
        })
          // }
      }
      usersss()
     // res.send({
     //          status: 0,
     //          data: []
     //        });
    }
  })

};
//**************** get_newsfeeds_likes_function ****************************
exports.get_likes_news = function(req, res) {
  var data=[];
  var counter = 0,
  dict = {};
  newsfeed.findOne({_id: req.body.id}, function(err, news) {
  console.log(news);
  if(news==null){
                res.json({
                   status: 0,
                   msg:'No record found'
                });
  }else{
       if(news.likes){
        if(news.likes.length>0){
             function like_list(){
              dict = news.likes[counter];
             users.findOne({_id: dict.userid}, function(err, user) {
              if(user!=null){
                dict.user_image = user.image;
                dict.user_name = user.firstname+' '+user.lastname;
                data.push(dict);
               }else{
                 data.push(dict);
               }
                if(counter < (news.likes.length-1) /*&& counter != (news.length-1)*/){
                   counter = counter + 1;
                   like_list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                    });
                 }
              })
          }
          like_list();
        }else{
           res.json({
                   status: 0,
                   msg:'No record found'
           });
        }
        }else{
           res.json({
                   status: 0,
                   msg:'No record found'
           });
       }
  }
}) 
}


//****************  likes_newsfeeds_function ****************************
exports.likenews = function(req, res) {
  newsfeed.findOne({'likes': {$elemMatch: {'userid': req.body.userid}}, '_id': req.body.id },function(err, check){
  console.log(check,"check");
  if(check == null){
    newsfeed.update({_id:req.body.id},{$push: {likes: {$each:[{userid:req.body.userid}]}}},{safe: true, upsert: true},function(err, doc) {
    console.log(doc,"dgdfg");
        if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
                  res.json({
                     status: 1,
                     liked:1,
                      msg:'Liked successfully!'
                  });
               }
    })
 }else{
        newsfeed.update({_id:req.body.id}, { $pull: {likes :{userid : req.body.userid } } },{ multi: true },function(err, obj) {
        if(obj.nModified==1){
           res.json({
                     status: 1,
                      msg:'Like removed successfully!'
                  });
        }else{
          res.json({
                     status: 0,
                     liked:0,
                      msg:'Please try again.'
                  });
        }
      })
  }
  });
}
//****************  comments_newsfeeds_function ****************************
exports.commentsnewsfeed = function(req, res) {
 newsfeed.update({_id:req.body.id},{$push: {comments: {$each:[{id:req.body.commentid,userid:req.body.userid,comment:req.body.comment,date:new Date()}]}}},{safe: true, upsert: true},function(err, doc) {
    console.log(doc,"dgdfg");
        if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
                  res.json({
                     status: 1,
                     data:doc,
                      msg:'Comment successfully!'
                  });
               }
    })
};

//******************** Delete newsfeed_function ************************
exports.deletefeed = function(req, res) {
      newsfeed.remove({_id:req.body._id}, function(err, feed) {
      if(feed == null){
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
//******************** Delete newsfeed_comments_function ************************
exports.deletecomment = function(req, res) {
    newsfeed.findOne({_id:req.body._id,user_id:req.body.user_id}, function(err, news) {
      if(news==null){
        newsfeed.update({_id:req.body._id}, { $pull: {comments :{userid : req.body.user_id, id:req.body.comment_id} } },{ multi: true },function(err, obj) {
          if(obj.nModified==1){
           res.json({
                     status: 1,
                      msg:'Deleted successfully!'
                  });
        }else{
          res.json({
                     status: 0,
                      msg:'You are not able to delete this comment!'
                  });
        }
      });
      }else{
         newsfeed.update({_id:req.body._id}, { $pull: {comments :{ id:req.body.comment_id} } },{ multi: true },function(err, obj) {
          if(obj.nModified==1){
           res.json({
                     status: 1,
                      msg:'Deleted successfully!'
                  });
          }else{
           res.json({
                     status: 0,
                     msg:'Please try again.'
                  });
        }

      });
    }
  });
};
//**************** get_newsfeeds_function ****************************
exports.getnews_admin = function(req, res) {
  var data=[];
  var counter = 0,
  counter1 = 0,
  dict = {},
  comm = {};
  // var perPage = 5;
  // var page =req.body.page;
  // users.find({ },function(err, users) {

  newsfeed.find({}, null, {sort: {'created_on': -1}},function(err, news) {
        if(news.length>0){
        console.log(news.length, "news length");
          function list(){
            dict = news[counter];
            console.log(counter,"oooooooooooooooooooooooooooooooo",dict.user_id)
            users.findOne({_id: dict.user_id}, function(err, user) {
            if(user!=null){
                 dict.user_image = user.image;
                 dict.user_name = user.firstname+' '+user.lastname ;
                 if(dict.comments && dict.comments.length>0){
                  console.log(dict.comments.length,"comments of users here")
                  counter1=0;
                  data.push(dict);
                  commentdata(dict);
                 }else{
                  console.log(news.length,"else", counter,news.length-1)
                  data.push(dict);
                  if(counter < (news.length-1)){
                     counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,            
                    });
                 }
               }
              
              
            }
          })
         };
         function commentdata(dict){
          comm = dict.comments[counter1];
          console.log(comm, "comm");
          console.log(counter1,"=======================================",comm.userid)
          users.findOne({_id:comm.userid}, function(err, users) {
             if(users!=null){
               comm.user_image = users.image;
               comm.user_name = users.firstname+' '+users.lastname ;
               console.log(comm,"coooooo",dict.comments.length,"length");
                if(counter1 < (dict.comments.length-1) && counter1 != dict.comments.length-1){
                console.log("+++++++++++++++++++",counter1)
                counter1 = counter1 + 1;
                commentdata(dict);
               }else{
               if(counter < (news.length-1) /*&& counter != (news.length-1)*/){
                   counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,           
                    });
             }
           }
         }/*else{
         newsfeed.remove({_id:dict._id}, function(err, feed) {
          if(counter < (news.length-1)){
                     counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,            
                    });
                 }

      })
         }*/
          })
         }
         list();
        }else{
          res.send({
              status: 0,
              data: data
            });
        }
          
        })

};
//**************** get_newsfeeds_for_singleuser_function ****************************
exports.news_by_userid = function(req, res) {
  var data=[];
  var counter = 0,
  counter1 = 0,
  dict = {},
  comm = {};
  var perPage = 5;
  var page =req.body.page;
  newsfeed.find({user_id:req.body.user_id}, null, {sort: {'created_on': -1}})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, news) {
          if(news.length>0){
          function list(){
            dict = news[counter];
             users.findOne({_id: dict.user_id}, function(err, user) {
            if(user!=null){
               dict.user_image = user.image;
                 dict.user_name = user.firstname+' '+user.lastname ;
                  if(dict.comments && dict.comments.length>0){
                   counter1=0;
                  data.push(dict);
                  commentdata(dict);
                 }else{
                    data.push(dict);
                  if(counter < (news.length-1)){
                     counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                      current: page                
                    });
                 }
               }
              }
          })
         };
         function commentdata(dict){
          comm = dict.comments[counter1];
          users.findOne({_id:comm.userid}, function(err, users) {
             if(users!=null){
               comm.user_image = users.image;
               comm.user_name = users.firstname+' '+users.lastname ;
               if(comm.userid== req.body.loginuser_id ||  req.body.loginuser_id == dict.user_id){
                comm.showdelete=1;
               }else{
                comm.showdelete=0;
               }
               if(counter1 < (dict.comments.length-1) && counter1 != dict.comments.length-1){
                 counter1 = counter1 + 1;
                commentdata(dict);
               }else{
               if(counter < (news.length-1) /*&& counter != (news.length-1)*/){
                   counter = counter + 1;
                   list();
                 }else{
                      res.send({
                      status: 1,
                      data: data,
                      current: page                
                    });
             }
           }
         }
          })
         }
         list();
        }else{
          res.send({
              status: 0,
              data: data
            });
        }
          
        })

};