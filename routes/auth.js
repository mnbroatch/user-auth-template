"use strict;"

const express = require('express');
const User = require('../models/user');

let router = express.Router();

//  this route's only job is to call middleware before a restricted state
router.post('/authorize', User.authMiddleware, (req,res) => {
	res.send();
})


router.post('/register', (req, res) => {
	User.register(req.body, err => {
		res.status(err ? 400 : 200).send(err);
	});
});


router.post('/login', (req, res) => {
	User.authenticate(req.body, (err, user) => {
		console.log('err:', err);
		if(err) return res.status(400).send(err);

		let token = user.generateToken();

		res.cookie('authtoken', token).send(user);
	});
});


router.post('/logout', (req, res) => {
	res.clearCookie('authtoken').send();
});


module.exports = router;

