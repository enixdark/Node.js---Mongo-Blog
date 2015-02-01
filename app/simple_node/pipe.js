var request = require('request'),
	fs = require('fs'),
	zlib = require('zlib');

var req = new request('http://gamevn.com');
//use pipe to zip file html
req.pipe(zlib.createGzip()).pipe(fs.createWriteStream('index.zip'));
