var util = require('util');
var Sequelize = require('sequelize');
var serialize = undefined;
var user = undefined;

exports.connect = function(params,callback){
	sequelize = new Sequelize(params.dbname,params.username,params.passport,params.params);

	user = sequelize.define('users',{
		id:{
			type:Sequelize.INTEGER,
			primaryKey:true,
			unique:true
		},
		username:{
			type:Sequelize.STRING,
			unique:true
		},
		password:{
			type:Sequelize.STRING
		},
		email:{
			type:Sequelize.STRING
		},
		createdAt: {
			field         : 'created_at',
			type          : Sequelize.DATE
		},
		updatedAt: {
			field         : 'updated_at',
			type          : Sequelize.DATE
		}
	},
	{
		tableName:'users',
		timestamps  : true,
	});

	user.sync().success(function(){
		callback();
	}).error(function(err) {
		callback(err);
	});
}

exports.disconnect = function(callback){
	callback();
}


// var findBy = function(name,value,callback){
// 	user.find({ where:{
// 		name:value
// 		}
// 	}).success(function(u){
// 		if(!u){
// 			callback('user ' + value +" Not found");
// 		}
// 		callback(null,{
// 			id:u.id,
// 			username:u.username,
// 			password:u.password,
// 			email:u.email
// 		});
// 	})
// }

exports.findById = function(id,callback){
	user.find({ where:{
		id:id
		}
	}).success(function(u){
		if(!u){
			callback('user ' + id +" Not found");
		}
		callback(null,{
			id:u.id,
			username:u.username,
			password:u.password,
			email:u.email
		});
	})
}

// exports.findById = findBy(id,callback);

exports.findByName = function(name,callback){
	user.find({ where:{
		username:name
		}
	}).success(function(u){
		if(!u){
			callback('user ' + name +" Not found");
		}
		callback(null,{
			id:u.id,
			username:u.username,
			password:u.password,
			email:u.email
		});
	})
}


exports.create = function(id,username,password,email,callback){
	user.create({
		id:id,
		username:username,
		password:password,
		email:email
	}).success(function(u){
		callback();
	}).error(function(err) {
		callback(err);
	});
}

exports.update = function(id,username,password,email){
	user.find({
		where:{
			id:id
		}
	}).success(function(u){
		user.updateAttributes({
			id:id,
			username:username,
			password:password,
			email:email
		}).success(function(){
			callback();
		}).error(function(err) {
			callback(err);
		});
	})
}
