'use strict';

module.exports = function(app) {

var userAdmin = require('../controllers/adminCtrl');
   app.route('/addUseradmin')
     .post(userAdmin.create_user_admin);

var adminlogin = require('../controllers/adminCtrl');
   app.route('/loginadmin')
     .post(adminlogin.login_admin);

var userlists = require('../controllers/userCtrl');
   app.route('/listuser')
     .post(userlists.userlist);

var deleteuserfromlist = require('../controllers/userCtrl');
   app.route('/userdelete')
     .post(deleteuserfromlist.deleteuser);

var edituserfromlist = require('../controllers/userCtrl');
   app.route('/edituser/:id')
     .post(edituserfromlist.update_user);

var edituserimage = require('../controllers/userCtrl');
   app.route('/edituserimage/:id')
     .post(edituserimage.update_user_image);

     app.route('/uploadImage')
     .post(edituserimage.upload_image);

var addcmspages = require('../controllers/cmspageCtrl');
   app.route('/addcms')
     .post(addcmspages.add);

var viewcmspages = require('../controllers/cmspageCtrl');
   app.route('/viewcms')
     .post(viewcmspages.view);

var add_course = require('../controllers/onlinecourseCtrl');
   app.route('/onlinecourse')
     .post(add_course.addcourse);

var list = require('../controllers/onlinecourseCtrl');
   app.route('/listcourse')
     .post(list.courselist);

var delete_course = require('../controllers/onlinecourseCtrl');
   app.route('/course_delete')
     .post(delete_course.deletecourse);

var today_course = require('../controllers/onlinecourseCtrl');
   app.route('/today_course_listing')
     .post(today_course.today_courselist_now);

var add_store = require('../controllers/storeCtrl');
   app.route('/store')
     .post(add_store.addstore);

var list = require('../controllers/storeCtrl');
   app.route('/liststores')
     .post(list.storelist);

var delete_store = require('../controllers/storeCtrl');
   app.route('/store_delete')
     .post(delete_store.deletestore);

var edit_art_vedio = require('../controllers/cmspageCtrl');
   app.route('/edit_articles_vedios')
     .post(edit_art_vedio.editarticles_vedios);
     
var delete_art_vedio = require('../controllers/cmspageCtrl');
   app.route('/delete_articles_vedios')
     .post(delete_art_vedio.deletearticles_vedios);

var updateadmin_profile = require('../controllers/adminCtrl');     
app.route('/updateprofile')
     .post(updateadmin_profile.update_admin_profile);

var uploadadmin_profile = require('../controllers/adminCtrl');     
app.route('/upload_admin_image')
     .post(uploadadmin_profile.upload_admin_image);

var changepass_admin = require('../controllers/adminCtrl');     
app.route('/change_password_admin')
     .post(changepass_admin.update_admin_password);

var get_news_list = require('../controllers/newsfeedCtrl');
    app.route('/newsfeeds_admin')
    .post(get_news_list.getnews_admin); 

var cat = require('../controllers/categoryCtrl');
    app.route('/addcategorty')
    .post(cat.add_categorty);    

var cats = require('../controllers/categoryCtrl');
    app.route('/uploadImage')
    .post(cats.upload_image);  

var cats = require('../controllers/categoryCtrl');
    app.route('/categortyexist')
    .post(cats.categorty_exist);  

var cats = require('../controllers/categoryCtrl');
    app.route('/categories')
    .post(cats.category_listing);   

var cats = require('../controllers/categoryCtrl');
    app.route('/deletecategory')
    .post(cats.delete_category);  
       
var cats = require('../controllers/categoryCtrl');
    app.route('/updatecategory')
    .post(cats.update_category);

// var edithost = require('../controllers/hostCtrl');
//     app.route('/list_edit')
//     .post(edithost.host_edit);     

// var edithost_status = require('../controllers/hostCtrl');
//     app.route('/change_status')
//     .post(edithost_status.edit_status);     
    
// var listhost_status = require('../controllers/hostCtrl');
//     app.route('/list_host_status')
//     .post(listhost_status.host_listing_course);     
    
var admin_scheuled = require('../controllers/onlinecourseCtrl');
   app.route('/scheduled_admin_courselist')
     .post(admin_scheuled.courselist_schedule_admin);

var delete_scheuled = require('../controllers/onlinecourseCtrl');
   app.route('/delete_scheduledcouse')
     .post(delete_scheuled.deletescheduled);

var userby_scheuled = require('../controllers/onlinecourseCtrl');
   app.route('/user_scheduled')
     .post(userby_scheuled.scheduledbyuser);

var delete_user_from_scheduled = require('../controllers/onlinecourseCtrl');
   app.route('/delete_user_scheduled_course')
     .post(delete_user_from_scheduled.delete_user_scheduled);

var admin_joined = require('../controllers/onlinecourseCtrl');
   app.route('/joined_admin_courselist')
     .post(admin_joined.courselist_joined_admin);

var admin_delete_joined = require('../controllers/onlinecourseCtrl');
   app.route('/delete_joined')
     .post(admin_delete_joined.deletejoined);

var userby_joined = require('../controllers/onlinecourseCtrl');
   app.route('/user_joined')
     .post(userby_joined.joinedbyuser);

var delete_user_from_joined = require('../controllers/onlinecourseCtrl');
   app.route('/delete_user_joined_course')
     .post(delete_user_from_joined.delete_user_joined);

var get_points_all = require('../controllers/pointCtrl');
   app.route('/getall_points')
     .post(get_points_all.getallpoints);

var getpoints_all = require('../controllers/pointCtrl');
   app.route('/get_all_points')
     .post(getpoints_all.get_earned_spent_points);

var forgotPassword = require('../controllers/adminCtrl');
    app.route('/admin_forgotpassword')
    .post(forgotPassword.forgot_password_admin);

var editstatuscmspages = require('../controllers/cmspageCtrl');
   app.route('/edit_cmsstatus')
     .post(editstatuscmspages.edit_status);

var view_cms_app = require('../controllers/cmspageCtrl');
   app.route('/view_cms_pages')
     .post(view_cms_app.viewcmspages);

var listing_group = require('../controllers/groupCtrl');
   app.route('/listinggroup_for_admin')
     .post(listing_group.listgroup_admin);

var delete_groupmethod = require('../controllers/groupCtrl');
   app.route('/deletegroup')
     .post(delete_groupmethod.delete_group);
     
};

