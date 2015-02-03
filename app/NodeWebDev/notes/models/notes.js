
var notes = {};

exports.update = exports.create = function(key,title,body){
	notes[key] = { title : title , body: body};
}

exports.read = function(key){
	return notes[key];
}

exports.delete = function(key){
	delete notes[key];
}

exports.keys = function() {
	return Object.keys(notes);
}
