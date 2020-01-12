'use strict'

var express = require('express');
var ReserveController = require('../controllers/reserve');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

var multipart = require('connect-multiparty'); //Subir ficheros para peticiones http
var md_upload = multipart({uploadDir: './uploads/reserves'});


api.get('/reserve/:id', md_auth.ensureAuth  , ReserveController.getReserve);
api.post('/reserve', ReserveController.saveReserve);
api.get('/reserves/', md_auth.ensureAuth  , ReserveController.getReserves);
api.get('/reserves/:date', md_auth.ensureAuth  , ReserveController.getReservesDate);
api.put('/reserve/:id', md_auth.ensureAuth  , ReserveController.updateReserve);
api.delete('/deleteReserve/:id', md_auth.ensureAuth  , ReserveController.deleteReserve);

module.exports = api;
