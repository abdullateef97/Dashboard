var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dashoard')

var index = require('./routes/index');
var goods = require('./routes/goods');
var manufacturers = require('./routes/manufacturers');
var unit = require('./routes/unit')
var xlsx = require('./routes/xlsx')
var dust = require('express-dustjs')
var app = express();
// Dustjs settings
dust._.optimizers.format = function (ctx, node) {
    return node
}

// Define custom Dustjs helper
dust._.helpers.demo = function (chk, ctx, bodies, params) {
    return chk.w('demo')
}

// Use Dustjs as Express view engine
app.engine('dust', dust.engine({
    // Use dustjs-helpers
    useHelpers: true
}))

// view engine setupst
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dust');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/goods', goods);
app.use('/manufacturers',manufacturers);
app.use('/unit',unit)
app.use('/xlsx',xlsx);

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

module.exports = app;
