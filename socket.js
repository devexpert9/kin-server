  var express = require('express'),
  app = express();
  // var http = require('http').Server(app);
  var server = app.listen(3001)
  var io = require('socket.io').listen(server);
  // var io = require('socket.io')(http),
  port = process.env.PORT || 3001;
  // app.listen(port);
  module.exports = app;
  // io.on('chat_message', (data) => {
  //    console.log('a user connected');
  //   io.emit('chat_message', {text: data.message, created: new Date()});    
  // });

  io.on('connection', function (socket) {
    console.log('ping-pong started');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('new-message', function (data) {
        console.log(data);
        socket.emit('message', data);
    });
});
  console.log('todo list RESTful API server started on: ' + port);
 