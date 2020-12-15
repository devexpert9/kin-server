'use strict';

var mongoose = require('mongoose'),
multer    = require('multer'),
users     = mongoose.model('users'),
profiles  = mongoose.model('profiles'),
contacts  = mongoose.model('contacts');
var path  = require('path');
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

exports.addContact = function(req, res)
{
  contacts.findOne({phone: req.body.phone, patientId: req.body.patientId}, function(err, user)
  {
    if(user == null)
    {
      var new_contact = new contacts({
        name:       req.body.name,
        phone:      req.body.phone,
        email:      req.body.email,
        password:   req.body.password,
        patientId:  req.body.patientId,
        created_on: new Date()
      });
     
      new_contact.save(function(err, contact)
      {
        //--SEND EMAIL-------------------------------
          var string  = 'Don'+'\''+'t worry, we all forget sometimes';
          var fs      = require('fs'); // npm install fs
          var readStream = fs.createReadStream(path.join(__dirname, '../templates') + '/contact.html', 'utf8');
          let dynamic_data = '';
          
          readStream.on('data', function(chunk) {
            dynamic_data += chunk;
          }).on('end', function() 
          {
            var helper    = require('sendgrid').mail;
            
            var fromEmail = new helper.Email('101.indiit@gmail.com','KIN');
            var toEmail   = new helper.Email(req.body.email);
            var subject   = 'Account Created As Contact';

            dynamic_data = dynamic_data.replace("#NAME#", req.body.name) ;
            dynamic_data = dynamic_data.replace("#EMAIL#", req.body.email) ;
            dynamic_data = dynamic_data.replace("#PASSWORD#", req.body.password) ;

            var content = new helper.Content('text/html', dynamic_data);

            var mail = new helper.Mail(fromEmail, subject, toEmail, content);
            // var sg = require('sendgrid')('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');
            
            var sg = require('sendgrid')('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');
            
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON()
            });
            sg.API(request, function (error, response) 
            {
              if (error) {
                console.log('NOT Send');
              }else{
                console.log('Send');
              }
              /*res.send({
                data: contact,
                status: 1,
                error: 'New contact added successfully!' 
              });*/
              /*if (error) {
                res.json({
                    msg: 'Something went wrong.Please try later.',
                    status: 0
                   
                });
              }else{
                res.json({
                    msg: 'Mail has been sent successfully',
                    status: 1,
                    data:null
                });
              }*/
            })
          }) 
        //-------------------------------------------

        
      });
    }
    else
    {
      res.send({
        status: 0, 
        data: null, 
        error: 'Contact with this phone number is already exist'
      });
    }
  });
};

exports.updateContact = function(req, res)
{
  contacts.findOne({phone: req.body.phone}, function(err, user)
  {
    if(user == null)
    {
      contacts.update({_id: req.body.contactId }, { $set: {name: req.body.name, email: req.body.email, phone: req.body.phone}}, {new: true}, function(err, save)
      {
        res.json({
           status: 1,
           data: null,
           error:'Contact updated successfully'
        });
      });
    }
    else
    {
      res.send({
        status: 0,
        data: null,
        error: 'Contact with this phone number already exist.'
      });
    }
  });
};

exports.getContacts = function(req, res)
{
    contacts.find({patientId: req.body.patientId }, function(err, contacts)
    {
      res.json({
         status: 1,
         data: contacts,
         error:null
      });
    });
};

exports.getContactByID = function(req, res)
{
    contacts.find({_id: req.body.contactId }, function(err, contacts)
    {
      res.json({
         status: 1,
         data: contacts,
         error:null
      });
    });
};

exports.deleteContact = function(req, res)
{
    contacts.remove({_id: req.body._id }, function(err, docs)
    {
      res.json({
         status: 1,
         data: null,
         error:"Contact deleted successfully"
      });
    });
};