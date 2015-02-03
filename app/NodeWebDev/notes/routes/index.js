var express = require('express');
var router = express.Router();
// var notes = require('../models/notes')
/* GET home page. */
var notes = undefined;
router.configure = function(params){
	notes = params.model;
}

router.get('/', function(req, res, next) {
  res.redirect('/notes');
});

module.exports = router;
