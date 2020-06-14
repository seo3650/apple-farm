const express = require('express');
const favorite = express.Router();

const favoriteCtrl = require('./favorite.controller');

favorite.post('/getItems', favoriteCtrl.getItems)
favorite.post('/setItems', favoriteCtrl.setItems)

module.exports = favorite;