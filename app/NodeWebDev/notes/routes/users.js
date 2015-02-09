var express = require('express');
var router = express.Router();
var LocalStragety = require('passport-local').Strategy;

var passport = undefined;
var user = undefined;



router.configure = function(params){
	user = params.model;
	passport = params.passport;

	router.post('/login',
		passport.authenticate('local')
			,function(req, res) {
			res.redirect('/');
	});

}

router.serialize = function (u, done) {
	done(null, u.id);
}

router.deserialize = function(id, done) {
	User.findById(id, function (err, u) {
		done(err, u);
	});
}

/* GET users listing. */

// exports.serialize = function(u, done) {
// 	done(null, u.id);
// }
// exports.deserialize = function(id, done) {
// 	users.findById(id, function (err, u) {
// 		done(err, u);
// 	});
// }

router.strategy = new LocalStragety(
	function(username,password,done){
		process.nextTick(function(){
			user.findByName(username,function(err,u){
				console.log(u);
				console.log(err);
				if(err) return done(err);
				if(!u) return done(null,false,{ message:"Unknown user" + username });
				if(u.password != password){
					return done(null,false,{
						message: 'Invalid password'
					});
				}
				return done(null,u);
			});
		});
	}
	);


router.ensureAuthenticated = function(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) { return next(); }
	return res.redirect('/users/login');
}

router
.get('/account',function(req, res){
	res.render('account', {
		title: 'Account information for ' + req.user.username,
		user: req.user,
		message: req.flash('error')
	});
})
.get('/login',function(req, res){
	res.render('login', {
		title: 'Login to Notes',
		user: req.user,
		message: req.flash('error')
	});
})
.get('/logout',function(req, res){
	req.logout();
	res.redirect('/');
})


module.exports = router;
