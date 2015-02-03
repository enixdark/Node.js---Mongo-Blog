
var fs = require('fs'),
async = require('async'),
path = require('path');
var util = require('util');
var _dirname = undefined;
var notes = {};

exports.connect = function(dirname,callback){
	_dirname = dirname;
	util.log(dirname);
	callback();
}

exports.disconnect = function(callback){
	callback();
}

exports.update = exports.create = function(key,title,body,callback){
	fs.writeFile(path.join(_dirname,key +'.json'),
		JSON.stringify({title:title,body:body}),
		'utf-8',
		function(err){
			if(err) callback(err);
			else callback();
		});
}

exports.read = function(key,callback){
	fs.readFile(path.join(_dirname,key+'.json'),
		'utf-8',
		function(err,data){
			if(err) callback(err);
			else callback(undefined,JSON.parse(data));
		}
		)
}

exports.delete = function(key,callback){
	fs.unlink(path.join(_dirname,key+'.json'),
		function(err,data){
			if(err) callback(err)
				else callback();
		}
		)
}


// exports.titles = function(callback) {
// 	fs.readdir(_dirname,
// 		function(err,filez){
// 			if(err) callback(err);
// 			else{
// 				var thenotes = [];
// 				async.eachSeries(filez,
// 					function(fname,cb){
// 						var key = path.basename(fname,'.json');
// 						exports.read(key,function(err,note){
// 							if(err) cb(err);
// 							else {
// 								thenotes.push({
// 									key:fname,title:note.title
// 								});
// 								cb();
// 							}
// 						});
// 					},
// 					function(err){
// 						if(err) callback(err);
// 						else callback(null,thenotes)
// 					});
// 			}
// 		});
// }

exports.titles = function(callback) {
	fs.readdir(_dirname, function(err, filez) {
		if (err) callback(err);
		else {
			var thenotes = [];
			async.eachSeries(filez,
				function(fname, cb) {
					var key = path.basename(fname, '.json');
					exports.read(key, function(err, note) {
						if (err) cb(err);
						else {
							thenotes.push({
								key: fname, title: note.title });
							cb();
						}
					});
				},
				function(err) {
					if (err) callback(err);
					else callback(null, thenotes);
				});
		}
	});
}
