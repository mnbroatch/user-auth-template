"use strict;"

const express = require('express');

let router = express.Router();

router.use('/users', require('./users'));
router.use('/things', require('./things'));
router.use('/auth', require('./auth'));

module.exports = router;

