'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticate');

var api = express.Router();

var multipart = require('connect-multiparty'); //Subir ficheros para peticiones http
var md_upload = multipart({uploadDir: '../uploads/users'});


api.get('/probando-controlador', md_auth.ensureAuth  , UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/getUser/:id', UserController.getUser);
api.put('/update-user/:id', md_auth.ensureAuth , UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload] , UserController.uploadImage);
// api.post('/upload-image-user/:id',  md_upload , UserController.uploadImage);
api.get('/get-image-user/:imageFile' , UserController.getImageFile);


module.exports = api;
