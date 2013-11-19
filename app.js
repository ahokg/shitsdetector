
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  qs = require('querystring');

var app = module.exports = express();
var server = http.createServer(app);
var io = io.listen(server);


/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
}; 



// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

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
       res.end();
    });
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
* Start Server
*/

server.listen(80);
