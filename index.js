var express = require('express');
var app = express();
//var socket = require(__dirname + '/socket.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
//var io = require('socket.io');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '/public'))); //Add CSS
app.use('/js', express.static(path.join(__dirname,'/js'))); //Add controller, data
app.use('/lib', express.static(path.join(__dirname,'/lib'))); //Add Angular and socket?

//Changed Jul 5
//io.sockets.on('connection', socket);
io.on('connection', function(socket){
	socket.on('chatmessage', function(msg){
		io.emit('chatmessage', msg);
	});
	socket.on('like', function(ideaName){
		io.emit('like', ideaName);
	});
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
