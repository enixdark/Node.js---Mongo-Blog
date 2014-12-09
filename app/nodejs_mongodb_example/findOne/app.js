var mongo = require('../db')

function handle_findOne(err,db,query){
	if(err) throw err;
	console.log('Result :');
	var result = [];
	db.collection('grades').findOne(query,function(err,doc){
		if(err) throw err;
		result = doc;
		console.dir(doc);
		db.close();
	});
	return result;
}

exports.handle_findOne = handle_findOne;

mongo.mongoclient.open(function(err,client){
	query = {'grade':100};
	db = client.db('course');
	handle_findOne(err,db,query);

});

