'use strict';

var kraken = require('kraken-js');
var express = require('express');
var http = require('http');


var app, server, port;

app = express();
app.use(kraken());

port = process.env.PORT || 8000;

server = http.createServer(app);

server.listen(port, function() {
  console.log('listening on port', port);
});
