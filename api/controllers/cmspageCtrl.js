'use strict';

var mongoose = require('mongoose'),
multer  = require('multer'),
cmspages = mongoose.model('cmspages');
var path = require('path');


// const bcrypt = require('bcrypt');
//****************  create and edit_cmspages_function ****************************
exports.add = function(req, res) {
    cmspages.findOne({type:req.body.type}, function(err, cms) {
    console.log(cms);
   if(cms == null){
       var newadd = new cmspages({
            aboutus: req.body.aboutus,
            type: req.body.type,
            articles: req.body.articles,
            vedios:req.body.vedios,
            created_on: new Date(),
            
            });
            newadd.save(function(err, save) {
            if(save == null){
              res.send({
                error: err,
                status: 0
              });
            }else{
                res.send({
                 status: 1,
                 add:1,
              msg: 'Added successfully!'
            });

       
            }
          });
    }else{
         cmspages.update({type: req.body.type}, { $set: {aboutus: req.body.aboutus,
          type: req.body.type,
          articles: req.body.articles,
          vedios:req.body.vedios,
          created_on: new Date()
        }}, {new: true}, function(err, save) {
              if(save == null){
                res.send({
                  status: 0,
                  data: save,
                  msg:'Try Again'
                });

              }else{
                res.json({
                   status: 1,
                   add:0,
                   data: save,
                   msg:'Updated successfully!'
                });
              }
            });
        }
  });
       
      
};
//****************  edit articles and vedios in cms pages ****************************
exports.editarticles_vedios = function(req, res) {
    if(req.body.subtype=="articles"){
      console.log("SDfs");
        cmspages.update({type:req.body.type}, { $pull: {articles :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
           cmspages.update({type:req.body.type},{$push: {articles: {$each:[
            {title:req.body.title,
            description:req.body.description,
            image:req.body.image,
            id:Number(req.body.id),
            status:req.body.status,
            }],$position: Number(req.body.id)-1}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
              if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
                  res.json({
                     status: 1,
                      msg:' Article has been updated successfully!'
                  });
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
      }else{
        console.log("Sppppp");
        cmspages.update({type:req.body.type}, { $pull: {vedios :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
            console.log("hdhfsdg")
            cmspages.update({type:req.body.type},{$push: {vedios: {$each:[
            {title:req.body.title,
            vedio:req.body.vedio,
            id:Number(req.body.id),
            status:req.body.status,
            }],$position: Number(req.body.id)-1}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
    // cmspages.update({type:req.body.type},{$push: {vedios: {title:req.body.title, vedio:req.body.vedio,id:Number(req.body.id)}}},
           // {safe: true, upsert: true},function(err, doc) {
            console.log(Number(req.body.id)-1,'POSITION');
           if(err){
               res.json({
                   status: 0,
                   msg:'Try Again!!'
                });
            }else{
                  res.json({
                     status: 1,
                      msg:'Vedio has been updated successfully!'
                  });
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
    
        // }
  // });
       
      
};
//****************  edit active status articles and vedios in cms pages in web ****************************

exports.edit_status = function(req, res) {
   if(req.body.subtype=="articles"){
      console.log("SDfs");
        cmspages.update({type:req.body.type}, { $pull: {articles :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
           cmspages.update({type:req.body.type},{$push: {articles: {$each:[
            {title:req.body.title,
            description:req.body.description,
            image:req.body.image,
            status:req.body.status,
            id:Number(req.body.id)
            }],$position: Number(req.body.id)-1}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
              if(err){
               res.json({
                   status: 0,
                   msg:'Try Again'
                });
            }else{
                  res.json({
                     status: 1,
                      msg:' Article has been updated successfully!'
                  });
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
      }else{
        console.log("Sppppp");
        cmspages.update({type:req.body.type}, { $pull: {vedios :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
            console.log("hdhfsdg")
            cmspages.update({type:req.body.type},{$push: {vedios: {$each:[
            {title:req.body.title,              
            status:req.body.status,
            vedio:req.body.vedio,
            id:Number(req.body.id)
            }],$position: Number(req.body.id)-1}}},{safe: true, upsert: true},function(err, doc) {
            console.log(doc,"dgdfg");
            console.log(Number(req.body.id)-1,'POSITION');
           if(err){
               res.json({
                   status: 0,
                   msg:'Try Again!!'
                });
            }else{
                  res.json({
                     status: 1,
                      msg:'Vedio has been updated successfully!'
                  });
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
    
        // }
  // });
       
};
//****************  view_cmspages_function ****************************
exports.viewcmspages = function(req, res) {
  var data=[];
  var data1=[];
  var counter = 0;
  var counter1 = 0,
  dict = {};
  if(req.body.type=="academic" || req.body.type=="sports"){
   cmspages.findOne({type:req.body.type},function(err, check){
  console.log(check,"ds");
    if(check== null){
      res.send({
        status: 0,
        data:null
        });
    }else{
      
      if(check.articles.length>0 ){
           function list(){
        if(check.articles[counter].status=="1" ){
          data.push(check.articles[counter]);
          // console
        }
       
        if(counter < (check.articles.length-1) ){
                     counter = counter + 1;
                      list();
         }else{
          console.log(check.vedios.length,"vedioslength");
                if(check.vedios.length>0){
                  function vediolist(){
                if(check.vedios[counter1].status=="1" ){
                    data1.push(check.vedios[counter1]);
                 }
                 if(counter1 < (check.vedios.length-1)){
                               counter1 = counter1 + 1;
                                vediolist();
                   }else{
                               check.articles=data;
                               check.vedios=data1;
                               res.send({
                                status: 1,
                                data: check,            
                              });
                  }

                
                }
                vediolist();
                }else{
                                check.articles=data;
                                res.send({
                                status: 1,
                                data: check,            
                              });
                }
                    //  check.articles=data;
                    //  check.vedios=data1;
                    //  res.send({
                    //   status: 1,
                    //   data: check,            
                    // });
        }
       }
         list()
   }
   
       // res.send({
       //  data:check,
       //  status: 1
       //  });  
     }
   })

  }else{
  cmspages.findOne({type:req.body.type}, function(err, cms) {
    console.log(cms);
   if(cms== null){
      res.send({
        status: 0,
        data:null
        });
    }else{
       res.send({
        data:cms,
        status: 1
        });  
   }
  });
  }

      
};
exports.view = function(req, res) {
  cmspages.findOne({type:req.body.type}, function(err, cms) {
    console.log(cms);
   if(cms== null){
      res.send({
        status: 0,
        data:null
        });
    }else{
       res.send({
        data:cms,
        status: 1
        });  
   }
  });
  // }

      
};
//****************  delete articles and vedios in cms pages ****************************
exports.deletearticles_vedios = function(req, res) {
    if(req.body.subtype=="articles"){
      console.log("SDfs");
       cmspages.update({type:req.body.type}, { $pull: {articles :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
              res.json({
                     status: 1,
                      msg:'Deleted successfully!'
                  });
          }else{
             res.json({
                   status: 0,
                   msg:'Try Again'
           });
          }
        })
      }else{
        console.log("Sppppp");
        cmspages.update({type:req.body.type}, { $pull: {vedios :{ id : Number(req.body.id) } } },{ multi: true },function(err, obj) {
          console.log(obj);
          if(obj.nModified==1){
             if(obj.nModified==1){
              res.json({
                     status: 1,
                      msg:'Deleted successfully!'
                  });
          }
          }else{
             res.json({
                   status: 0,
                   msg:'Try Again'
              });
          }
        })
      }
    
        // }
  // });
       
      
};
// db.cmspages.update({type:'academic'},{$push: {articles: {title:'fgfdgdf',id:2}}})
//  db.cmspages.update({type:'academic'},{$push: {articles: {$each: [{title:'fgfdgdf',id:2}],$position: 2}}})