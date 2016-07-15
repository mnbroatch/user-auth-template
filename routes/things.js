const express = require('express');
const Thing = require('../models/thing');
const User = require('../models/user');

const router = express.Router();

router.route('/:id')
.get((req, res) => {
  User.findById(req.params.id)
  .populate(['things'])
  .exec((err, user) => {
    res.status((err || !user) ? 400 : 200).send(err || user);
  });
})
.put((req, res) => {
  Thing.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, savedThing) => {
    res.status(err ? 400 : 200).send(err || savedThing);
  });
})
.delete((req, res) => {
  Thing.findByIdAndRemove(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});


router.route('/')
.get((req, res) => {
  Thing.find({}, (err, things) => {
    res.status(err ? 400 : 200).send(err || things);
  });
})
.post((req, res) => {
  const thing = new Thing(req.body.thing);
  thing.save((err, savedThing) => {
    if (err) res.status(400).send(err);
    User.findByIdAndUpdate(req.body.user._id, { $push: { things: savedThing._id } }, () => {
      res.status(err ? 400 : 200).send(err || savedThing);
    });
  });
});

module.exports = router;
