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

var product = require('../controllers/productCtrl');
    app.route('/productlisting')
     .post(product.product_listing_for_buy);
};




