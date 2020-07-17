var fs = require('fs');
var socket = require('socket.io'), 

https = require('https'),
server = https.createServer({
   key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}), 
socket = socket.listen(server);

  socket.on('connection', function(connection) {

    connection.on('seen-message', function(msg){
       socket.emit('seen-message', msg);
     });

    connection.on('add-message', function(msg){
       socket.emit('message', msg);
     });

    connection.on('seen-all-group-message', function(msg){
       socket.emit('seen-all-group-message', msg);
     });
    
    connection.on('message', function(msg){
      socket.emit('online', msg.message);
          socket.emit('message-list', msg);
      socket.emit('message', msg.message);
     });

    connection.on('group-message', function(msg){
      socket.emit('group-online', msg);
      socket.emit('group-list', msg);
      socket.emit('group-message', msg);
     });

    connection.on('group-list', function(msg){
       socket.emit('group-list', msg);
     });

     connection.on('everyone-delete-message', function(msg){
       socket.emit('everyone-delete-message', msg);
     });

      connection.on('deliver-message', function(msg){
       socket.emit('deliver-message', msg);
     });

      connection.on('deliver-group-message', function(msg){
       socket.emit('deliver-group-message', msg);
     });
    
      connection.on('updateStatusofmsgs', function(msg){
       socket.emit('updateStatusofmsgs', msg);
     });

      connection.on('user-online', function(msg){
       socket.emit('user-online', msg);
     });

  });

  server.listen(3001, function(){
    console.log('Server started');
  });