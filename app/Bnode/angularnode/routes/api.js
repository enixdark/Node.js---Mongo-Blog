var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../db')
var mongodb = require('mongodb');
/* GET users listing. */
router.use(bodyParser.json());
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.route('/')
.get(function(req,res,next){
	db.collection.find().toArray(function(err,docs){
		res.send({
			status:'Item found',
			items:docs
		});
	});
})
.post(function(req,res,next){
	var item = req.body;
	db.collection.insert(item,function(err,docs){
		res.send({
			status: 'Item added',
			itemId: item._id
		});
	})
});

router.route('/:id')
.delete(function(req,res,next){
	var id = req.params['id'];
	var item = { _id: new mongodb.ObjectID(id)};
	db.collection.remove(item,function(err,results){
		res.send({status:'Item clear'});
	});
});
module.exports = router;
