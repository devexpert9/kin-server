'use strict';

module.exports = function(app) {

var adduser = require('../controllers/userCtrl');
   app.route('/registerUser')
     .post(adduser.registerUser);

var adduser = require('../controllers/userCtrl');
   app.route('/login')
     .post(adduser.login);

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


//----- CONTACTS -------------------------------

var contacts = require('../controllers/contactsCtrl');
   app.route('/addContact')
     .post(contacts.addContact);

var contacts = require('../controllers/contactsCtrl');
   app.route('/getContacts')
     .post(contacts.getContacts);

//----- CALLS -------------------------------

var calls = require('../controllers/callsCtrl');
   app.route('/addCall')
     .post(calls.addCall);

var calls = require('../controllers/callsCtrl');
   app.route('/getCalls')
     .post(calls.getCalls);


};