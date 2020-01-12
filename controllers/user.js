'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req,res){
    res.status(200).send({
        message: 'Probando una accion del controlador de usuarios del api rest con node y mongo'
    });
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = params.role;
    user.image = 'null';

    if (params.password){
        //encriptar y guardar
        var existe = false;
        bcrypt.hash(params.password,null,null,function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null )
            {
                User.findOne({email: user.email.toLowerCase()} , (err, userFound) =>{
                    if (err){
                        res.status(500).send({message: 'Error en la peticion'});
                    }else{
                        if(userFound){
                            return res.status(404).send({message: 'Ya hay un usuario registrado con el email ingresado'});
                        }else{
                            user.save((err, userStored) => {
                                if(err){
                                    res.status(500).send({message: 'Error al guardar el usuario'});
                                }else{
                                    if(!userStored){
                                        res.status(404).send({message: 'No se ha registrado el Usuario'});
                                    }else{
                                        res.status(200).send({user: userStored});
                                    }
                                }
                            });
                        }
                    }
                });

                //return;
                //guardar usuario

            }else{
                res.status(404).send({message: 'Rellenar todos los campos'});
            }
        })
    }else{
        //devolver error
        res.status(500).send({message: 'Introducir la contraseña'});
    }

}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()} , (err, user) =>{
        if (err){
            res.status(500).send({message: 'Error en la peticion'});
        }else
        {
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //Comprobar contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check)
                    {
                        //devolver datos de usuario logueado
                        if(params.gethash){
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user),
                                user: user
                            });
                        }else{

                            res.status(200).send({user: user});

                        }
                    }else{
                        res.status(404).send({message: 'El Usuario no ha podido loguearse'});
                    }
                });
            }
        }
    });

}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});//error de server
    }

    User.findByIdAndUpdate(userId, update, (err,userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});//error de server
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});//error de server
            }else{
                res.status(200).send({user: userUpdated});//Devuelvo el usuario con los datos actualizados
            }
        }
    });
}


function getUser(req, res){
    var userId = req.params.id;
    var update = req.body;
/*
    if (userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});//error de server
    }
*/
    User.findById(userId, (err,userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});//error de server
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});//error de server
            }else{
                res.status(200).send({user: userUpdated});//Devuelvo el usuario con los datos actualizados
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'Imagen no subida';
    console.log(req);
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var extension_file = ext_split[1];
        console.log(ext_split);

        if (extension_file ==  'jpg' || extension_file ==  'gif' || extension_file ==  'png')
        {
            User.findByIdAndUpdate(userId, {image: file_name}, (err,userUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error al actualizar la imagen de usuario'});//error de server
                }else{
                    if(!userUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar la imagen'});//error de server
                    }else{
                        res.status(200).send({image: file_name, user: userUpdated});//Devuelvo el usuario con los datos actualizados
                    }
                }
            });
        }else{
            res.status(200).send({message: 'La extension del archivo a subir no es valida'});//Devuelvo el usuario con los datos actualizados
        }



    }else{
        res.status(404).send({message: 'No se ha subido ninguna imagen'});//error de server
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;

    fs.exists(pathFile, function(exists){
        if (exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});//error de server
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    getUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};
