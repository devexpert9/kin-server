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
  
var product = require('../controllers/productCtrl');
    app.route('/addproduct')
     .post(product.add_product);

var product = require('../controllers/productCtrl');
    app.route('/productslist')
     .post(product.product_listing);

var product = require('../controllers/productCtrl');
    app.route('/isproductexist')
     .post(product.is_product_exist);
    
};

