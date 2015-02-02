var express = require('express'),
router = express.Router();
var math = require('../math');


router
.get('/',function(req,res,next){
	console.warn(req.query);
	if (req.query.fibonum) {
		math.fibonacci(req.query.fibonum, function(err, fiboval){
			res.render('fibonacci', {
				title: "Calculate Fibonacci numbers",
				fibonum: req.query.fibonum,
				fiboval: fiboval
			});
		});
	} else {
		res.render('fibonacci', {
			title: "Calculate Fibonacci numbers",
			fiboval: undefined
		});
	}
});
// .post('/',function(req,res,next){
// 	console.warn(req.query);
// 	if (req.query.fibonum) {
// 		res.render('fibonacci', {
// 			title: "Calculate Fibonacci numbers",
// 			fibonum: req.query.fibonum,
// 			fiboval: math.fibonacci(req.query.fibonum)
// 		});
// 	} else {
// 		res.render('fibonacci', {
// 			title: "Calculate Fibonacci numbers",
// 			fiboval: undefined
// 		});
// 	}
// })
router.get('/:num', function(req, res, next) {
	math.fibonacci(Math.floor(req.params.num),
		function(err, val) {
			if (err) next('Server Error ' + e);
			else {
				res.send({
					n: req.params.num,
					result: val
				});
			}
		});
});

module.exports = router;
