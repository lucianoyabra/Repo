'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = Schema({
    number: String,
    capacity: String,
    description: String,
    positionX: String,
    positionY: String,
    salon: { type: Schema.ObjectId, ref: 'Salon' }
});

module.exports = mongoose.model('Table', TableSchema);