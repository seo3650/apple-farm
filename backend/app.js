const cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/apple_farm_simulation', 
  { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', function(error) {
  console.error("Connection error;", error);
});
db.once('open', function(){
  console.log("Connected to mongod server");
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');

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
app.use(require('connect-history-api-fallback')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: "ksdjwv@!!ssz224455mml;/.v",
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60
  }),
  cookie: {
    maxAge: 1000 * 60 * 2
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/login', login);

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
