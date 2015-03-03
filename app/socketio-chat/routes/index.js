var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WelCome Socket.io' });
})
.get('/rooms',function(req,res,next){
	res.render('rooms',{title:'Rooms'})
})
.get('/chatroom',function(req,res,next){
	res.render("chatroom",{title:"Chat Room"})
})
;

module.exports = router;
