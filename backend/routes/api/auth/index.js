const express = require('express');
const auth = express.Router();

const authCtrl = require('./auth.controller');

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.post('/changePassword', authCtrl.changePassword);
auth.post('/withdrawal', authCtrl.withdrawal);

module.exports = auth;