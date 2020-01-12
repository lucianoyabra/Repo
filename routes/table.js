'use strict'

var express = require('express');
var TableController = require('../controllers/table');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

var multipart = require('connect-multiparty'); //Subir ficheros para peticiones http
var md_upload = multipart({uploadDir: './uploads/tables'});


api.get('/table/:id', md_auth.ensureAuth  , TableController.getTable);
api.post('/table', md_auth.ensureAuth  , TableController.saveTable);
api.get('/tables/:id?', md_auth.ensureAuth  , TableController.getTables);
api.put('/table/:id', md_auth.ensureAuth  , TableController.updateTable);
api.delete('/table/:id?', md_auth.ensureAuth  , TableController.deleteTable);


module.exports = api;
