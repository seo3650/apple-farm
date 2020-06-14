const express = require('express');
const router = express.Router();

const authRouter = require('./auth/index');
const favoriteRouter = require('./favorite/index');

router.use('/auth', authRouter);
router.use('/favorite', favoriteRouter);

module.exports = router;
