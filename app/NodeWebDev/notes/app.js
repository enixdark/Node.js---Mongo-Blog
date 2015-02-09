var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var seqConnectParams = require('./sequelize-params');


var app = express();

app.use(session({
  secret: 'secret-key'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(users.serialize);
passport.deserializeUser(users.deserialize);
passport.use(users.strategy);
//change path if you decided to other database or filesystem
// var model = require('./models/models-mongoose/notes');
var noteModel = require('./models/models-sequelize/notes');
var usersModel = require('./models/models-sequelize/users');
//uncomment if use file or simple relationship database
// model.connect("./data/db.sqlite3", function(err) {
//     if (err) throw err;
// });

//uncommet if use ORM or ODM
noteModel.connect(
    seqConnectParams,
    function(err){
        throw err;
    });



usersModel.connect(
    seqConnectParams,
    function(err) {
        if (err) throw err;
    });
// model.connect("mongodb://localhost:27017/notes");


users.passport = passport;
users.configure({
    model:usersModel,
    passport:passport
});

[ routes,notes ].forEach(function(router) {
    router.configure({
        model: noteModel,
    });
});




// app.get('/logout',
//     users.doLogout);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/notes', notes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
