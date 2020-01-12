'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResreveSchema = Schema({
    name: String,
    email: String,
    phone: String,
    date: Date,
    time: String,
    people: Number
});

module.exports = mongoose.model('Reserve', ResreveSchema);