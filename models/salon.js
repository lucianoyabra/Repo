'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalonSchema = Schema({
    description: String,
    date: Date
});

module.exports = mongoose.model('Salon', SalonSchema);