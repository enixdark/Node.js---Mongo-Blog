var mongo = require('./db');
var express = require('express');
var cons = require('consolidate');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

app = express();


mongo.mongoclient.open(function(err,client){
    if(err) throw err;
    db = client.db('course');
    app.engine('html',cons.swig);
    app.set('view engine','html');
    app.set('views',__dirname + "/views");
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //app.use(express.static(__dirname + '/static'));
    app.use(express.static(__dirname + '/static'));
    app.use(express.static(__dirname + '/views'));
    routes(app, db);
    app.listen(8080);
    console.log('Express server listening on port 8080');

});