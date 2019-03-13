'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
users = mongoose.model('users'),
group = mongoose.model('group');
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

//****************  create_group_function ****************************
exports.addgroup = function(req, res) {
          var data=[];
           var counter = 0,
           counter1 = 0,
           comm={};
          var new_user = new group({
            name: req.body.name,
            userdata: req.body.user,
            // image:req.body.image,
            created_on:new Date(),
            // admin_id:req.body.admin_id,
            });
            new_user.save(function(err, usersa) {
            if(usersa == null){
              res.send({
                error: err,
                status: 0
              });
            }else{
              console.log(usersa,"ddd")
            group.findOne({_id:usersa._id}, null, {sort: {'created_on': -1}},function(err, group_detail) {
            // console.log(group_detail,"length",group_detail.length)
            if (group_detail == null ){
                  res.send({
                    error: err,
                    status: 0,
                    data: null
                  });
              }else{
           // users.findOne({_id:group_detail.admin_id}, function(err, user) {
           //      group_detail.admin_username = user.firstname+' '+ user.lastname;
           //      group_detail.admin_image = user.image;
                comm = group_detail.userdata;
                function userdata(comm){
                  console.log(comm[counter1],"sdf")
                  users.findOne({_id:comm[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                      data.push({
                        id : group_detail.userdata[counter1].id,
                        user_id : group_detail.userdata[counter1].user_id,
                        is_admin : group_detail.userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                       console.log(data,"dsd");

                      if(counter1 < group_detail.userdata.length-1){
                        counter1 = counter1+1;
                        userdata(comm);
                      }else{
                           group_detail.userdata = data;
                           res.json({
                            status: 1,
                            data: group_detail
                          });
                       
                      }
                    }else{console.log("elseeeee");
                       if(counter1 < group_detail.userdata.length-1){
                        counter1 = counter1+1;
                        userdata(comm);
                       }else{
                        group_detail.userdata = data;
                           res.json({
                            status: 1,
                            data: group_detail
                          });
                       
                      } 
                    }
                    })
                  }
                  if(comm.length>0){
                  userdata(comm);
                  }else{
                     group_detail.userdata = [];
                           res.json({
                            status: 1,
                            data: group_detail
                          });
                  }
                      
              // })

          
           }
          });
          }
          });
      
};
//****************  list_group_function ****************************
exports.listgroup = function(req, res) {
  var data=[];
 var counter = 0,
 counter1 = 0,
 comm={},
 dict = {};
     group.find({'userdata': {$elemMatch: {'user_id': req.body.admin_id}}}, null, {sort: {'created_on': -1}},function(err, group_detail){
     console.log(group_detail)
 
  // group.find({admin_id:req.body.admin_id}, null, {sort: {'created_on': -1}},function(err, group_detail) {
       // console.log(group_detail,"length",group_detail.length)
       if (group_detail.length==0){
              res.send({
                error: err,
                status: 0,
                data: []
              });
          }else{
            function list(){
              data = [];
              // users.findOne({_id:group_detail[counter].admin_id}, function(err, user) {
              //   group_detail[counter].admin_username = user.firstname+' '+ user.lastname;
              //   group_detail[counter].admin_image = user.image;
                // console.log(group_detail[counter],"sdfsdf",counter)
                if(group_detail[counter].userdata.length>0){
                    comm = group_detail[counter].userdata;
                    counter1=0;
                   userdata(comm);
                }else{
                  if(counter < group_detail.length-1){
                    counter = counter+1;
                    list();
                  }else{
                    res.json({
                      status: 1,
                      data: group_detail
                    });
                  }
                }         
              // })
            };
            list();

            function userdata(comm){
                  console.log(comm[counter1],"sdf")
                  users.findOne({_id:comm[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                      data.push({
                        id : group_detail[counter].userdata[counter1].id,
                        user_id : group_detail[counter].userdata[counter1].user_id,
                        is_admin : group_detail[counter].userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                       console.log(data,"dsd");

                      if(counter1 < group_detail[counter].userdata.length-1){
                        counter1 = counter1+1;
                        userdata(comm);
                      }else{
                        group_detail[counter].userdata = data;
                         if(counter < group_detail.length-1){
                          counter = counter+1;
                          list();
                        }else{
                          res.json({
                            status: 1,
                            data: group_detail
                          });
                        }
                      }
                    }else{console.log("elseeeee");
                       if(counter1 < group_detail[counter].userdata.length-1){
                        counter1 = counter1+1;
                        userdata(comm);
                       }else{
                        group_detail[counter].userdata = data;
                        if(counter < group_detail.length-1){
                          counter = counter+1;

                          list();
                        }else{
                          res.json({
                            status: 1,
                            data: group_detail
                          });
                        }
                      } 
                    }
                    })
                  }
           }
  });
};
//****************  likes_newsfeeds_function ****************************
exports.add_admin = function(req, res) {
  var counter=0,
  counter1=0,
  data={};
  var data1=[];
      if(req.body.admin_data.length>0){
        group.findOne({'userdata': {$elemMatch: {'user_id': req.body.user_id,'is_admin': '1' }}},function(err, check){
        if(check!=null){
            list();
        }else{
          res.json({
                   status: 0,
                   msg:'Only for admin'
           });
        }
        })
       
          function list(){
          data1 = [];
          var data = req.body.admin_data[counter]; 
          group.update({_id:req.body._id}, { $pull: {userdata :{ id : Number(data.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
           group.update({_id:req.body._id},{$push: {userdata: {$each:[
            {
            user_id:data.user_id,
            is_admin:"1",
            image:data.image,
            id:Number(data.id),
            }],$position: Number(data.id)-1}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
              if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
              if(counter < req.body.admin_data.length-1){
                counter = counter+1;
                list();
              }else{
               group.findOne({_id:req.body._id},function(err, groups){
                console.log(groups,"+++++++=");
                console.log(groups.userdata);
               if(groups!=null){
                 userdata(groups)
               }else{
                res.json({
                             status: 1,
                             data:groups,
                             msg:' Group has been updated successfully!'
                        });
               }
                
               })
             
              }
                  
          //do stuff
          }
        });
          }else{
             res.json({
                   status: 0,
                   msg:'Try Again'
           });
          }
        })
    }
  
       function userdata(groups){
                      users.findOne({_id:groups.userdata[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                       data1.push({
                        id : groups.userdata[counter1].id,
                        user_id : groups.userdata[counter1].user_id,
                        is_admin :groups.userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                       console.log(data,"dsd");

                      if(counter1 < groups.userdata.length-1){
                        counter1 = counter1+1;
                        userdata(groups);
                      }else{
                        groups.userdata=data1;
                         res.json({
                             status: 1,
                             data:groups,
                             msg:' Group has been updated successfully!'
                        });
                      }
                    }
                    })
                  }
    }else{
       res.json({
                   status: 0,
                   msg:'Try Again'
           });
    }

  

}
//****************  add admin for single user _function ****************************
exports.add_admin_single = function(req, res) {
  var counter=0,
  counter1=0;
  var data1=[];
     group.findOne({'userdata': {$elemMatch: {'user_id': req.body.created_id,'is_admin': '1' }}},function(err, check){
        if(check!=null){
          group.update({_id:req.body._id}, { $pull: {userdata :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
           group.update({_id:req.body._id},{$push: {userdata: {$each:[
            {
            user_id:req.body.user_id,
            is_admin:req.body.is_admin,
            image:req.body.image,
            id:Number(req.body.id),
            }],$position: Number(req.body.id)-1}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
              if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
               group.findOne({_id:req.body._id},function(err, groups){
                   if(groups != null){
                 userdata(groups)
                    function userdata(groups){
                      users.findOne({_id:groups.userdata[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                       data1.push({
                        id : groups.userdata[counter1].id,
                        user_id : groups.userdata[counter1].user_id,
                        is_admin :groups.userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                      
                      if(counter1 < groups.userdata.length-1){
                        counter1 = counter1+1;
                        userdata(groups);
                      }else{
                        groups.userdata=data1;
                         res.json({
                             status: 1,
                             data:groups,
                             msg:' Group has been updated successfully!'
                        });
                      }
                    }
                    })
                  }
               }else{
                res.json({
                             status: 1,
                             data:groups,
                             msg:' Group has been updated successfully!'
                        });
               }
                
               })
               // res.json({
               //     status:1,
               //     msg:'successfully'
               //  });
            }
          })
         }else{
            res.json({
                   status: 0,
                   msg:'Try Again'
                });
         }
         })
        }else{
          res.json({
                   status: 0,
                   msg:'Only for admin'
           });
        }
        })
       


}
//****************  add user in group_function ****************************
exports.add_user = function(req, res) {
  var counter=0;
  var counter1=0;
  var data1=[];
  var data=[];
     group.findOne({_id: req.body._id},function(err, check){
        if(check!=null){
          if(req.body.user.length>0){
            list();
          }
          function list(){
            group.update({_id:req.body._id},{$push: {userdata: {$each:[
            {
            user_id:req.body.user[counter].user_id,
            is_admin:req.body.user[counter].is_admin,
            image:req.body.user[counter].image,
            id:Number(req.body.user[counter].id),
            }]/*,$position: Number(req.body.id)-1*/}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
              if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
              if(counter<req.body.user.length-1){
                counter=counter+1;
                list();
              }else{
                group.findOne({_id:req.body._id},function(err, groups){
                  if(groups!= null){
                 userdata(groups)
               }else{
                  res.json({
                   status: 0,
                   msg:'No group Yet!'
                });
               }
                
               })
                //  res.json({
                //    status: 1,
                //    msg:'Added successfully'
                // });
              }
            }})
          } 
          function userdata(groups){
                      users.findOne({_id:groups.userdata[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                       data1.push({
                        id : groups.userdata[counter1].id,
                        user_id : groups.userdata[counter1].user_id,
                        is_admin :groups.userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                       console.log(data1,"dsd");

                      if(counter1 < groups.userdata.length-1){
                        counter1 = counter1+1;
                        userdata(groups);
                      }else{
                        groups.userdata=data1;
                        res.json({
                           status: 1,
                           data:groups,
                           msg:'Added successfully'
                        });
                      }
                    }
                    })
                  }
        
        }else{
          res.json({
                   status: 0,
                   msg:'Only for admin'
           });
        }
        })
       


}

//**************** remove users from groups in app ******************
exports.remove_user = function(req, res) {
  group.findOne({_id:req.body._id}, function(err, groups) {
    if (groups == null){
      res.send({
        error: err,
        status: 0,
        data: null
      });
    }else{
          group.update({_id:req.body._id}, { $pull: {userdata :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
              res.send({
              status: 1,
              msg: "User removed successfully!"
            })
          }else{
            res.send({
              error: err,
              status: 0,
              msg: "Try again!"
            })
          }
        })
      
    }
  });
};
//****************  add user in group_function ****************************
exports.edit_user = function(req, res) {
  var counter=0;
  var counter1=0;
  var data1=[];
  var data=[];
     group.findOne({_id: req.body._id},function(err, check){
        if(check!=null){
         group.update({_id: req.body._id }, { $set: {name: req.body.name,image: req.body.image}}, {new: true}, function(err, save) {
          if(save!=null){
              group.findOne({_id: req.body._id},function(err, groups){
                    function userdata(){
                      users.findOne({_id:groups.userdata[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                       data1.push({
                        id : groups.userdata[counter1].id,
                        user_id : groups.userdata[counter1].user_id,
                        is_admin :groups.userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                       console.log(data1,"dsd");

                      if(counter1 < groups.userdata.length-1){
                        counter1 = counter1+1;
                        userdata();
                      }else{
                        groups.userdata=data1;
                         res.send({
                              data:groups,
                              status: 1,
                              msg: "Group has been updated successfully!"
                            })
                      }
                    }
                    })
                  }
           userdata();
          })
          }else{
            res.send({
              error: err,
              status: 0,
              msg: "Try again!"
            })
          }
         })
        }else{
          res.json({
                   status: 0,
                   msg:'No group found'
           });
        }
        })
};
//****************  list_group for admin _function ****************************
exports.listgroup_admin = function(req, res) {
  var data=[];
 var counter = 0,
 counter1 = 0,
 comm={},
 dict = {};
     group.find({}, null, {sort: {'created_on': -1}},function(err, group_detail){
       console.log(group_detail)
   // group.find({admin_id:req.body.admin_id}, null, {sort: {'created_on': -1}},function(err, group_detail) {
       // console.log(group_detail,"length",group_detail.length)
       if (group_detail.length==0){
              res.send({
                error: err,
                status: 0,
                data: []
              });
          }else{
            function list(){
              data = [];
              if(group_detail[counter].userdata.length>0){
                    comm = group_detail[counter].userdata;
                    counter1=0;
                   userdata(comm);
                }else{
                  if(counter < group_detail.length-1){
                    counter = counter+1;
                    list();
                  }else{
                    res.json({
                      status: 1,
                      data: group_detail
                    });
                  }
                }         
              // })
            };
            list();

            function userdata(comm){
                  console.log(comm[counter1],"sdf")
                  users.findOne({_id:comm[counter1].user_id}, function(err, singleuser) {
                    if(singleuser != null){
                      console.log("iffffffff");
                      data.push({
                        id : group_detail[counter].userdata[counter1].id,
                        user_id : group_detail[counter].userdata[counter1].user_id,
                        is_admin : group_detail[counter].userdata[counter1].is_admin,
                        image : singleuser.image,
                        username: singleuser.firstname+' '+ singleuser.lastname
                      })
                       console.log(data,"dsd");

                      if(counter1 < group_detail[counter].userdata.length-1){
                        counter1 = counter1+1;
                        userdata(comm);
                      }else{
                        group_detail[counter].userdata = data;
                         if(counter < group_detail.length-1){
                          counter = counter+1;
                          list();
                        }else{
                          res.json({
                            status: 1,
                            data: group_detail
                          });
                        }
                      }
                    }else{console.log("elseeeee");
                       if(counter1 < group_detail[counter].userdata.length-1){
                        counter1 = counter1+1;
                        userdata(comm);
                       }else{
                        group_detail[counter].userdata = data;
                        if(counter < group_detail.length-1){
                          counter = counter+1;

                          list();
                        }else{
                          res.json({
                            status: 1,
                            data: group_detail
                          });
                        }
                      } 
                    }
                    })
                  }
           }
  });
};

//******************** Otp_verification_function ************************
exports.delete_group = function(req, res) {
       group.remove({_id:req.body._id}, function(err, user) {
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
          msg:"Deleted Successfully"
        });
      }
    });

};
