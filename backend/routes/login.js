const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto');
// const properties = require('../properties/key.js');

router.get('/', function (req, res, next) {
    alert('Please use post');
});

router.post('/signUp', function (req, res, next) {
    const user = new User();
    user.id = req.body.user.id;
    user.password = req.body.user.password;
    user.name = req.body.user.name;

    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(user.password, 'utf8', 'base64');
    let cipherPw = cipher.final('base64');
    user.password = cipherPw;
    user.save(function(err) {
        if (err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

router.post('/checkLogin', function(req, res, next) {
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(req.body.user.password, 'utf8', 'base64');
    let cipherPw = cipher.final('base64');

    User.findOne({id: req.body.user.id, password: cipherPw}, function(err, user) {
        if (err) return res.status(500).json({ error:err });
        if (!user) return res.status(404).json({ error: 'user not found' });
        res.json(user);
    })
})

module.exports = router;