var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const item = require("./src/item/item.route")
const user = require("./src/user/user.route")

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.get('/', function(req, res, next) {
  res.json({
    code: 200,
    status: 'success',
    message: ['this is test end point'],
    result: []
  })
})

app.use('/users', require('./src/user/user.route'))
app.use('/item', item);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
