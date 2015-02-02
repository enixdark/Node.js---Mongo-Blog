var sniffOn = require('./httpsniffer');
var http = require('http');
var util = require('util');
var url = require('url');
var os = require('os');
var server = http.createServer();

sniffOn.sniffOn(server);
server.listen(3000);
console.log('server run at localhost:3000');
