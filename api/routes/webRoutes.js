'use strict';

module.exports = function(app) {

var userAdmin = require('../controllers/adminCtrl');
   app.route('/addUseradmin')
     .post(userAdmin.create_user_admin);

var adduser = require('../controllers/userCtrl');
   app.route('/addUser')
     .post(adduser.addUser);

var loginuser = require('../controllers/userCtrl');
   app.route('/login')
     .post(loginuser.login);

var userData = require('../controllers/userCtrl');
   app.route('/getUserDomain')
     .post(userData.getUserDomain);

var userlists = require('../controllers/userCtrl');
   app.route('/listuser')
     .post(userlists.userlist);

var cms = require('../controllers/cmspageCtrl');
   app.route('/add_cmspage')
     .post(cms.add_cmspage);

var cmsData = require('../controllers/cmspageCtrl');
   app.route('/getPageData')
     .post(cms.getPageData);

var imageupload = require('../controllers/userCtrl');
   app.route('/upload_image')
     .post(imageupload.upload_image);

var dashboard = require('../controllers/dashboardCtrl');
   app.route('/add_dash_section')
     .post(dashboard.add_dash_section);

var dashboard = require('../controllers/dashboardCtrl');
   app.route('/get_dash_sections')
     .post(dashboard.getPageData);

var dashboard = require('../controllers/dashboardCtrl');
   app.route('/update_dash_sections')
     .post(dashboard.update_dash_section_item);

    
};

