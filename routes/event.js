'use strict'

var express = require('express');
var EventController = require('../controllers/event');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

var multipart = require('connect-multiparty'); //Subir ficheros para peticiones http
var md_upload = multipart({uploadDir: './uploads/events'});


api.get('/event/:id', md_auth.ensureAuth  , EventController.getEvent);
api.get('/events/:page?', md_auth.ensureAuth  , EventController.getEvents);
api.post('/event', md_auth.ensureAuth  , EventController.saveEvent);
api.put('/updateEvent/:id', md_auth.ensureAuth  , EventController.updateEvent);
api.delete('/deleteEvent/:id', md_auth.ensureAuth, EventController.deleteEvent);

module.exports = api;