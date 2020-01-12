'use strict'

var express = require('express');
var SalonController = require('../controllers/salon');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

var multipart = require('connect-multiparty'); //Subir ficheros para peticiones http
//var md_upload = multipart({uploadDir: './uploads/reserves'});


api.get('/salon/:id', md_auth.ensureAuth  , SalonController.getSalon);
api.post('/salon', md_auth.ensureAuth  , SalonController.saveSalon);
api.put('/salon/:id', md_auth.ensureAuth  , SalonController.updateSalon);
api.get('/salones/:id?', md_auth.ensureAuth  , SalonController.getSalones);
api.delete('/salon/:id', md_auth.ensureAuth  , SalonController.deleteSalon);
// api.post('/formulario', SalonController.sendMail )


module.exports = api;
