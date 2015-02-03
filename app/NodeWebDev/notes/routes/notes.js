var express = require('express');
var router = express.Router();
// var notes = require('../models/notes')
var util = require('util');

var notes = undefined;
router.configure = function(params){
	notes = params.model;
}


// router
// .get('/noteadd',function(req,res,next){
// 	res.render('noteedit', {
// 		title: "Add a Note",
// 		docreate: true,
// 		notekey: "",
// 		note: undefined
// 	});
// })
// .get('/noteedit',function(req,res,next){
// 	res.render('noteedit', {
// 		title: "Edit a Note",
// 		docreate: false,
// 		notekey: req.query.key,
// 		note: notes.read(req.query.key)
// 	});
// })
// .get('/notedestroy',function(req,res,next){
// 	if(req.query.key){
// 		notes.delete(req.query.key);
// 	}
// 	res.redirect('/notes');
// });

// router
// .post('/notesave',function(req,res,next){
// 	if(req.body.docreate === "create"){
// 		notes.create(req.body.notekey,req.body.title,req.body.body);
// 	}
// 	else{
// 		notes.update(req.body.notekey,req.body.title,req.body.body)
// 	}
// 	res.redirect('noteview?key=' + req.body.notekey);
// });

// router.get('/noteview',function(req,res,netx){
// 	var note = undefined;
// 	if(req.query.key){
// 		note = notes.read(req.query.key);
// 	}
// 	res.render('noteview',{
// 		title:note ? note.title : "",
// 		notekey:req.query.key,
// 		note:note
// 	})
// });

var readNote = function(key, res, done) {
	// var _key = key.split('.').shift();
	var _key = key;
	console.warn(key);
	notes.read(_key,
		function(err, data) {
			util.log(data);
			if (err) {
				res.render('error', {
					title: "Error",
					error: "Could not found note " + key
				});
				done(err);
			} else done(null, data);
		});
}

router
.get('/',function(req,res,next){
	notes.titles(function(err,titles){
		util.log(JSON.stringify(titles));

		if(err){
			res.render('error', {
				title: "Error",
				error: "Could not found note " + err
			});
		}
		res.render('index', { title: 'Notes',notes:titles });
	});
})
.get('/noteadd',function(req,res,next){
	res.render('noteedit', {
		title: "Add a Note",
		docreate: true,
		notekey: "",
		note: undefined
	});
})
.get('/noteedit',function(req,res,next){
	if(req.query.key){
		readNote(req.query.key,res,function(err,data){
			if(err){
				res.render('error',{
					title:'Error',
					error:"Not found The data" + err
				});
			}
			res.render('noteedit',{
				title:'Edit a Note',
				docreate:false,
				notekey:req.query.key,//req.query.key.split('.').shift(),
				note:data
			});
		});
	}
})
.get('/notedestroy',function(req,res,next){
	if(req.query.key){
		notes.delete(req.query.key,function(err){
			if(err){
				res.render('error',{
					title:'Error',
					error:'Not found The data' + err
				});
			}
			res.redirect('/notes');
		})
	}
})
.get('/noteview',function(req,res,next){
	if(req.query.key){
		readNote(req.query.key,res,function(err,data){
			if(err){
				res.render('error',{
					title:'Error',
					error:'Not found The data' + err
				});
			}
			res.render('noteview',{
				title: data['title'],
				notekey: req.query.key,
				note: data
			});
		});
	}
});

router.post('/notesave',function(req, res, next) {
	util.log(req.body.docreate);

	((req.body.docreate === "create")
		? notes.create : notes.update
		)(req.body.notekey, req.body.title, req.body.body,
		function(err) {
			util.log("Hello");
			if (err) {
				res.render('error', {
					title: "Could not update file" + err,
					error: err
				});
			} else {
				res.redirect('noteview?key='+req.body.notekey);
			}
		});
	});


module.exports = router;
