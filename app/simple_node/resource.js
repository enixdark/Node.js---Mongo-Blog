var EventEmitter = require('events').EventEmitter;
var util = require('util');


module.exports.getResource = function getResource(c){
	var e = new EventEmitter();
	process.nextTick(function(){
		var count = 0;
		e.emit('start');
		var t = setInterval(function(){
			e.emit('data',++count);
			if(count == c){
				e.emit('end',count);
				clearInterval(t);
			}
		},10);
	});
	return(e);
}

function Resource(c){
	var self = this;
	process.nextTick(function(){
		var count = 0;
		self.emit('start');
		var t = setInterval(function(){
			self.emit('data',++count);
			if (count === c){
				self.emit('end',count);
				clearInterval(t);
			}
		},100);
	});
}

module.exports.Resource = Resource;

util.inherits(Resource,EventEmitter);
