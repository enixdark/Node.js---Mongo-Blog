var util = require('util'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	dburl = undefined;

exports.connect = function(thedburl,callback){
	dburl = thedburl;
	mongoose.connect(dburl);
}

exports.disconnect = function(callback){
	mongoose.disconnect(callback);
}

var NoteSchema = new Schema({
	notekey:String,
	title:String,
	body:String
});

mongoose.model('notes',NoteSchema);
var notes = mongoose.model('notes');

exports.create = function(key,title,body,callback){
	var _notes = new notes();
	_notes.title = title;
	_notes.notekey = key;
	_notes.body = body;
	_notes.save(function(err){
		if(err) callback(err);
		else callback()
	})
}

exports.update = function(key,title,body,callback){
	exports.read(key,function(err,doc){
		if(err) callback(err);
		else{
			doc.title = title;
			doc.body = body;
			doc.save(function(err){
				if(err) callback(err);
				else callback();
			})
		}
	})

}

exports.read = function(key,callback){
	var _notes = notes.findOne({ notekey : key},function(err,doc){
		if(err) callback(err);
		else callback(null,doc);
	});
}

exports.delete = function(key,callback){
	exports.read(key,function(err,doc){
		if(err) callback(err);
		else{
			// notes.remove({notekey:doc.notekey},function(err){
			// 	if(err) callback(err);
			// 	else callback();
			// })
			doc.remove();
			callback();
		}
	});
}

exports.titles = function(callback){
	notes.find().exec(function(err,docs){
		if(err) callback(err);
		else{
			if(docs){
				var thenotes = [];
				docs.forEach(function(doc){
					thenotes.push({
						title:doc.title,
						key:doc.notekey
					})
				});
				callback(null,thenotes);
			}
			else{
				callback();
			}
		}
	});
}
