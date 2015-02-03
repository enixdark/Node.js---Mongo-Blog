var sequelize = require('sequelize');

var notes = undefined;

exports.connect = function(params,callback){
	var sequlz = new sequelize(
		params.dbname,params.username,params.password,params.params
		);
	notes = sequlz.define('notes',{
		notekey:{
			type:sequelize.STRING,
			primaryKey:true,
			unique:true
		},
		title : sequelize.STRING,
		body : sequelize.TEXT,
		createdAt: {
			field         : 'created_at',
			type          : sequelize.DATE
		},
		updatedAt: {
			field         : 'updated_at',
			type          : sequelize.DATE
		}
	},
		{
			tableName   : 'notes',
			timestamps  : true,
		});
	notes.sync().success(function(){
		callback();
	}).error(function(err){
		callback(err);
	});
}

exports.disconnect = function(callback){
	callback();
}

exports.create = function(key,title,body,callback){
	notes.create({
		notekey:key,
		title:title,
		body:body
	}).success(function(note){
		callback()
	}).error(function(err){
		callback(err);
	})
}

exports.update = function(key,title,body,callback){
	notes.find({ where : { notekey:key }})
	.success(function(note){
		if(!note){
			callback(new Error("no note found the key: " + key));
		}
		note.updateAttributes({
			title:title,
			notekey:key,
			body:body
		}).success(function(){
			callback();
		}).error(function(err) {
			callback(err);
		});
	}).error(function() {
		callback(err);
	});
}

exports.read = function(key,callback){
	notes.find({ where:{ notekey:key }}).success(function(note){
		if(!note){
			callback(new Error("cannot found data"));
		}
		callback(null,{
			notekey:note.key,
			title:note.title,
			body:note.body
		});
	}).error(function(err) {
		callback(err);
	});;
}

exports.delete = function (key,callback){
	notes.find({ where : { notekey:key }})
	.success(function(note){
		note.destroy().success(function(){
			callback();
		}).error(function(err) {
			callback(err);
		});
	}).error(function() {
		callback(err);
	});
}

exports.titles = function(callback){
	notes.findAll().success(function(note){
		var thenotes = [];
		note.forEach(function(item){
			thenotes.push({
				key:item.notekey,
				title:item.title
			});
		});
		callback(null,thenotes);
	});
}
