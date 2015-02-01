var getResource = require('./resource').getResource;
//Define event


var r = getResource(5);

r.on('start',function(){
	console.log('start');
})

r.on('data',function(d){
	console.log('event ->' + d);
})

r.on('end',function(t){
	console.log('end time ' + t);
})
