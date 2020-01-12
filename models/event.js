'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = Schema({
    name: String,
    description: String,
    date: Date,
    time: String,
    estate: String,
    people: Number,
    price: String,
    reserve:{type: Schema.ObjectId, ref: 'Reserve'},
    table: {type: Schema.ObjectId, ref: 'Table'}
});

module.exports = mongoose.model('Event', EventSchema);