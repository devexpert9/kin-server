  var express = require('express'),
  app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http),
  port = process.env.PORT || 3001;
  app.listen(port);
  module.exports = app;
  io.on('chat_message', (data) => {
     console.log('a user connected');
    io.emit('chat_message', {text: data.message, created: new Date()});    
  });
  console.log('todo list RESTful API server started on: ' + port);
 