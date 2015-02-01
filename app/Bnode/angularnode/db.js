var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/demo",function(err,data){
	if(err) throw err;

	module.exports.db = data;
	module.exports.collection = data.collection('items');
});
