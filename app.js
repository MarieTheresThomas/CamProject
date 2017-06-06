'use strict';

var adaro = require('adaro');
var express = require('express');
var path = require('path');
var session = require('cookie-session');

// Setup modules and dependencies
var config = require('./config');

var cloudVisionClient = require('./lib/cloudVisionClient')(
  config.gcloudVision
);
console.log("CVC initialized");
var app = express();

// Set view template engine
app.engine('dust', adaro.dust());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');
app.use(express.static(path.join(__dirname, 'public')));

// Configure the session and session storage.
app.use(session({
  secret: config.secret,
  signed: true
}));

// Configure routes
app.use('/', require('./lib/routes')( //pass in two variables to required ressouces!
  cloudVisionClient
));
console.log("routes configured");

// Basic 404 handler
app.use(function(req, res) {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use(function(err, req, res, next) {
  console.error(err);

  // Send response if exists, if not send a custom message
  res.status(500).send(err.response || 'Server failed!');
});

// Start the server
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
