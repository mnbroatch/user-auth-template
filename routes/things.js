"use strict;"


let express = require('express');
let Thing = require('../models/thing');
let User = require('../models/user');

let router = express.Router();




router.route('/:id')
.get(function(req,res){
	User.findById(req.params.id)
	.populate(['things'])
	.exec((err,user) => {
		res.status((err || !user)? 400:200).send(err ||user);
	});
})
.put(function(req,res){
	Thing.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedThing) => {
		res.status(err? 400:200).send(err || savedThing);
	});
})
.delete(function(req,res){
	Thing.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});



router.route('/')
.get(function(req,res){
	Thing.find({}, (err,things) => {
		res.status(err? 400:200).send(err || things);
	});
})
.post(function(req,res){
	let thing = new Thing(req.body.thing);
	thing.save((err,savedThing) => {
		if (err) res.status(400).send(err);
		User.findByIdAndUpdate(req.body.user._id, {$push:{"things":savedThing._id}},function(){
			res.status(err? 400:200).send(err || savedThing);
		});
	});
});


module.exports = router;

