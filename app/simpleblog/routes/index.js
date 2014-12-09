/**
 * Created by enixdark on 12/9/14.
 */

var setting = require('./../../../settings');
var path = require('path');
module.exports = exports = function (app,db){
    console.log(resources.rousource_path);
    app.get('/',function(req,res,next){
        res.render('index.html',{path:resources.rousource_path});
    });
}