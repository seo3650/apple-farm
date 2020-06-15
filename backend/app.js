const cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { jwtMiddleware } = require('./routes/lib/token');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect("mongodb+srv://seo:sparcs@apple-farm-onq1r.gcp.mongodb.net/apple_farm?retryWrites=true&w=majority", 
  { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', function(error) {
  console.error("Connection error;", error);
});
db.once('open', function(){
  console.log("Connected to mongod server");
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://seo:sparcs@apple-farm-onq1r.gcp.mongodb.net/apple_farm?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect();

// var db = client.connection;
// console.log(client)
// db.on('error', function(error) {
//   console.error("Connection error;", error);
// });
// db.once('open', function(){
//   console.log("Connected to mongod server");
// });

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jwtMiddleware);

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
