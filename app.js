/**
 * Module dependencies
 */

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , qs = require('querystring');

server.listen(80);

// Routes
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(require('express').static(__dirname + '/'));

// JSON API
app.get('/api/name', api.name);
app.post('/sensor', function(req, res) {
    var body = '';
    req.on('data', function(data) {
       body += data;
    });
    req.on('end', function() {
       var POST = qs.parse(body);
       console.log(POST);

       io.sockets.emit('distance', {
        data: POST
       });

       res.end();
    });
});

// redirect all others to the index (HTML5 history)

/**
* Start Server
*/

server.listen(80);
