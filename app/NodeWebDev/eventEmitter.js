var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Pulse(){
	EventEmitter.call(this);
}

util.inherits(Pulse,EventEmitter);

Pulse.prototype.start = function(){
	var self = this;
	this.id = setInterval(function(){
		util.log('>>>>pulse');
		self.emit('pulse');
		util.log('<<<<pulse');
	},1000);
}

var p = new Pulse();

// p.on('pulse',function(){
// 	console.log('pulse receive');
// });

p.start();


