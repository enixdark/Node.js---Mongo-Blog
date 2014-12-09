/**
 * Created by enixdark on 12/8/14.
 */
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var setting = require('../settings');

exports.setting = setting;
exports.mongoclient = new MongoClient(new Server(setting.DB.host,setting.DB.port,{native_parser:true}));