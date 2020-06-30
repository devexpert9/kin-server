'use strict';

module.exports = function(app) {

var adduser = require('../controllers/userCtrl');
   app.route('/registerUser')
     .post(adduser.registerUser);

};