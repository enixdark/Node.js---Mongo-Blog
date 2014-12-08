var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var mongoclient = new MongoClient(new Server('localhost',27017,{native_parser:true}));
//var db = mongoclient.db('course');
function handle_findOne(err,db,query){
	if(err) throw err;
	console.log('Result :');
	db.collection('grades').findOne(query,function(err,doc){
		if(err) throw err;
		console.dir(doc);
		db.close();
	});

}
var t;

mongoclient.open(function(err,client){
	query = {'grade':100};
	db = client.db('course');
	handle_findOne(err,db);

});

