'use strict';

module.exports = function(app) {

var adduser = require('../controllers/userCtrl');
   app.route('/registerUser')
     .post(adduser.registerUser);

//----- Profile Page Callings-------------------------------
var profiles = require('../controllers/profilesCtrl');
   app.route('/addProfile')
     .post(profiles.addProfile);

var profiles = require('../controllers/profilesCtrl');
   app.route('/updateProfile')
     .post(profiles.updateProfile);

var profiles = require('../controllers/profilesCtrl');
   app.route('/getProfiles')
     .post(profiles.getProfiles);

var profiles = require('../controllers/profilesCtrl');
   app.route('/deleteProfile')
     .post(profiles.deleteProfile);

};