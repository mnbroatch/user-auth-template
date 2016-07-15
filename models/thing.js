const mongoose = require('mongoose');


const thingSchema = new mongoose.Schema({
  name: String,
});


const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;

