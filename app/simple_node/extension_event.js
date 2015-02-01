var Resource = require('./resource').Resource;

var r = new Resource(5);

r.on('start',function(){
	console.log('start');
})

r.on('data',function(d){
	console.log('event ->' + d);
})

r.on('end',function(t){
	console.log('end time ' + t);
})
