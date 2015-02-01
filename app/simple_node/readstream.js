var request = require('request');

var req = new request("http://google.com");

req.on('data',function(chunk){
	console.log('data >>>' + chunk.length);
});

req.on('end',function(chunk){
	console.log('end');
});
