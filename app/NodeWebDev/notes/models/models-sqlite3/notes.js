var sqlite3 = require('sqlite3');

sqlite3.verbose();
var db  = undefined;

exports.connect = function(dbname,callback){
	db = new sqlite3.Database(dbname,sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
		function(err){
			if(err) callback(err)
			else callback();
		});
}

exports.disconnect = function(callback){
	callback();
}

exports.create = function(key,title,body,callback){
	console.log('dsddd');
	db.run("INSERT INTO notes(notekey,title,body)" + "VALUES(?,?,?)",[key,title,body],
		function(err){
			if(err) callback(err);
			else callback();
		});
}

exports.update =  function(key,title,body,callback){
	db.run("Update notes set title = ?, body = ? where notekey = ?",[title,body,key],
		function(err){
			if(err) callback(err);
			else callback();
		});
}

exports.read = function(key,callback){
	db.get("select * from notes where notekey = ? ",[key],function(err,row){
		if(err) callback(err);
		else callback(null,row);
	});
}

exports.delete = function(key,callback){
	db.run("delete from notes where notekey = ? ",[key],function(err,row){
		if(err) callback(err);
		else callback(null,row);
	});
}

exports.titles = function(callback){
	var titles = [];
	db.each("select * from notes",function(err,row){
		if(err) callback(err);
		else titles.push(
			{
				title:row.title,
				key:row.notekey
			}
			);
	},function(err,num){
		if(err) callback(err);
		else callback(null,titles);
	});
}
