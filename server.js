var express = require('express');
var port = 9487;
var path = require('path');
var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '')));
app.get('/', function(req, res){ res.sendFile(__dirname + '/experiment.html');});

io.on('connection', function(socket){

    console.log('user '+ user_num + ' connected');
    var user = user_num++;
    var start_record_time = -1;

    socket.on('disconnect', function(){
        console.log('user '+user+' disconnected');
    });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});
