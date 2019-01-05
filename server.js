var express = require('express');
var port = 9487;
var path = require('path');
var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function finit(filename) {
    var t = new Date().Format("yyyyMMdd-hhmm");
    fs.writeFile(filename, "created @ " + t + '\n', function(err){
        if (err) {
          console.error(err)
        }
    });
}

function fwrite(filename, data) {
    fs.appendFile( filename , data + '\n', function(err){
        if (err) { console.error(err) }
    });
}

function savevid(filename, blob) {

}

var user_num=0;

app.use(express.static(path.join(__dirname, '')));
app.get('/', function(req, res){ res.sendFile(__dirname + '/experiment.html');});

io.on('connection', function(socket){

    console.log('user '+ user_num + ' connected');
    var user = user_num++;
    var start_record_time = -1;
    var fname = 'invalid';

    var initialized = false;
    var allchunks = [];


    socket.on('subj_num', function(expt, n){
        var t = new Date().Format("hh:mm:ss.S");
        console.log('subj_num: ' + n);

        var t = new Date().Format("yyyyMMdd-hhmm");
        fname = 'log/Sub' + n + '-' + t;
        finit(fname);
        fwrite(fname, 'experiment offset: ' + expt + ', ' + t);
        fwrite(fname, 'start recording: ' + start_record_time);
        initialized = true;
    });

    socket.on('start_recording', function(n){
        start_record_time = new Date().Format("hh:mm:ss.S");
        if (initialized)
            fwrite(fname, 'start recording: ' + start_record_time);
        console.log('start record');
    });

    socket.on('send_start', function(){
        console.log('send start');
    });

    socket.on('chunk', function(i, chunk){
        console.log('chunk #' + i);
        allchunks.push(chunk);
    });

    socket.on('send_end', function(){
        console.log('send end');
        var fullBlob = new Blob(allchunks, {type: 'video/mp4'});
        fs.writeFile(fname +'.mp4' , fullBlob, function(err){
            if (err) {
                console.error(err)
            }
        });
    });

    socket.on('vid', function(data){
        fs.writeFile(fname +'.mp4' , data, function(err){
            if (err) {
                console.error(err)
            }
        });
    })

    socket.on('disconnect', function(){
        console.log('user '+user+' disconnected');
    });

});

http.listen(port, function(){
  console.log('listening on *:'+port);
});
