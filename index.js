var prayerTimetable = require("prayer-timetable")

'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');

var index = require('./routes');

var app = express();
app.locals.email = 'ensar@farend.net';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator() ); // Add this after the bodyParser middlewares!

app.use(cookieParser());

// static
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/timetable', express.static(__dirname + '/node_modules/prayer-timetable/public/'));
app.use(express.static(path.join(__dirname, 'node_modules/prayer-timetable/public')));
app.use('/icci', express.static(path.join(__dirname, 'public/icci')));
app.use('/jsext', express.static(path.join(__dirname, 'public/js')));
app.use('/cssext', express.static(path.join(__dirname, 'public/css')));
app.use('/db', express.static(path.join(__dirname, 'public/db')));


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.disable('x-powered-by');

module.exports = app;
