var express = require('express');
var cons = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var bodyParser = require('body-parser');

var mongoclient  = new MongoClient(new Server('localhost',27017,{'native_parser':true}));
var db = mongoclient.db('db');
app = express();
app.engine('html',cons.swig);
app.set('view engine','html');
app.set('views',__dirname + "/views");
// app.set(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// app.use(app.router);

//Handler for errors
function errorHandler(err,req,res,next){
	console.error(err.message);
	console.error(err.status);
	res.status(500);
	res.render('error',{error:err});
}
app.use(errorHandler);

app.get('/',function(req,res){
    // res.send("Hello World");
    // res.render('hello.html', { 'name':'SWIG'});
    db.collection('db').findOne({},function(err,doc){
    	if(err) throw err;
    	res.render('hello',doc);
    });
});

// app.get('/:name',function(req,res,next){
// 	console.log(req.params);
// 	console.log(req.query);

// 	var name = req.params.name;
// 	var getvar1 = req.query.getvar1;
// 	var getvar2 = req.query.getvar2;
// 	res.render('hello',{name : name, getvar1 : getvar1 , getvar2:getvar2});

// });

app.get('/fruit',function(req,res,next){
	res.render('fruit_Picker',{'fruits':['apple','orange','lemon']});
});

app.post('/favorite_fruit',function(req,res,next){
	console.log('method '+ req.method + " " + req.url);
	var fruit = req.body.fruit;
	if(typeof fruit == 'undefined'){
		next(Error('Please choose fruit'));
	}
	else{
		res.send('Your favorite fruit is :' + fruit);
	}
});

app.get('*',function(req,res){
    // res.send("Hello World");
    // res.render('hello.html', { 'name':'SWIG'});
    res.status(404).send("<h1>Page not Found</h1>");
});

mongoclient.open(function(err,client){

	if(err) throw err;

	app.listen(8080);
	console.log('server start at localhost:8080');

});
