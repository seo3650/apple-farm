var express = require('express');
var api = express.Router();

/* GET home page. */
api.get('/', function(req, res, next) {
  next();
});

module.exports = api;