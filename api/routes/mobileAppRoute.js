'use strict';

module.exports = function(app) {
// app api's start 
var user = require('../controllers/userCtrl');
   app.route('/adduser')
     .post(user.signup);

var userlogin = require('../controllers/userCtrl');
   app.route('/loginuser')
     .post(userlogin.login);

var forgotPassword = require('../controllers/userCtrl');
    app.route('/forgotpassword')
    .post(forgotPassword.forgot_password);

var updateuser = require('../controllers/userCtrl');
   app.route('/updateinfo')
     .post(updateuser.update_user);

var otpVerfication = require('../controllers/userCtrl');
    app.route('/verifyotp')
    .post(otpVerfication.otp_verification);

var userprofileUpdate = require('../controllers/userCtrl');
    app.route('/updateuserprofileData/:id')
    .post(userprofileUpdate.update_user_profile);

var view_profile = require('../controllers/userCtrl');
    app.route('/signleuser')
    .post(view_profile.viewprofile);

var change_pass = require('../controllers/userCtrl');
    app.route('/change_password')
    .post(change_pass.update_user_password);
    
var category = require('../controllers/categoryCtrl');
    app.route('/categorylist')
    .post(category.category_list);

var category = require('../controllers/categoryCtrl');
    app.route('/updateViewCount')
    .post(category.update_view_count);    

var course_list_schedule = require('../controllers/onlinecourseCtrl');
    app.route('/schedule_course_listing')
    .post(course_list_schedule.courselist_schedule);    

var add_points = require('../controllers/pointCtrl');
    app.route('/add_join')
    .post(add_points.addpoints);    

var get_points = require('../controllers/pointCtrl');
    app.route('/points')
    .post(get_points.getpoints);    

var add_points_join = require('../controllers/pointCtrl');
    app.route('/add_join_points')
    .post(add_points_join.addpoints_join);   
    
var add_feed = require('../controllers/newsfeedCtrl');
    app.route('/addnewsfeed')
    .post(add_feed.addfeed);    

var get_newslist = require('../controllers/newsfeedCtrl');
    app.route('/newsfeeds')
    .post(get_newslist.getnews);    

var newsfeed_byuserid = require('../controllers/newsfeedCtrl');
    app.route('/feeds_user_id')
    .post(newsfeed_byuserid.news_by_userid);  
    
var add_likes = require('../controllers/newsfeedCtrl');
    app.route('/addlikes')
    .post(add_likes.likenews);    

var add_comments = require('../controllers/newsfeedCtrl');
    app.route('/addcomments')
    .post(add_comments.commentsnewsfeed);    

var list_like = require('../controllers/newsfeedCtrl');
    app.route('/like_list')
    .post(list_like.get_likes_news); 

var remove_feed = require('../controllers/newsfeedCtrl');
    app.route('/remove_newsfeed')
    .post(remove_feed.deletefeed);  

var remove_comments = require('../controllers/newsfeedCtrl');
    app.route('/removecomment')
    .post(remove_comments.deletecomment);  

var listing_user_app = require('../controllers/userCtrl');
    app.route('/list')
    .post(listing_user_app.user_listing);  

var user_follow_status = require('../controllers/userCtrl');
    app.route('/followeruser')
    .post(user_follow_status.follow);  


var showuserlist_addgroup = require('../controllers/userCtrl');
    app.route('/show_users_add_group')
    .post(showuserlist_addgroup.show_users_addgroup);  

var add_group = require('../controllers/groupCtrl');
    app.route('/group_add')
    .post(add_group.addgroup); 


var list_group = require('../controllers/groupCtrl');
    app.route('/listing_group')
    .post(list_group.listgroup); 

var add_admin_status = require('../controllers/groupCtrl');
    app.route('/addadmin')
    .post(add_admin_status.add_admin); 

var addadmin = require('../controllers/groupCtrl');
    app.route('/addadmin_single')
    .post(addadmin.add_admin_single); 
 
var add_user_ongroup = require('../controllers/groupCtrl');
    app.route('/adduser_group')
    .post(add_user_ongroup.add_user);    

var edit_user_ongroup = require('../controllers/groupCtrl');
    app.route('/edituser_group')
    .post(edit_user_ongroup.edit_user);    

var removeuserfromgroup = require('../controllers/groupCtrl');
    app.route('/remove_member')
    .post(removeuserfromgroup.remove_user);    

var add_chat = require('../controllers/chatCtrl');
    app.route('/createchat')
    .post(add_chat.addchat);    
 
var chat = require('../controllers/chatCtrl');
    app.route('/list_chat')
    .post(chat.listchat); 


};




