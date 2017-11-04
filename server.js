var express = require('express')
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.text());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.post('/', function (req, res) {
    //console.log(req)
    var out = Buffer.from(req.body, 'base64').toString()
    console.log(req.body)
    io.emit('news',req.body)
    res.send('OK')
})

server.listen(process.env.PORT || 3000) 