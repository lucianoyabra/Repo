'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePagination = require('mongoose-pagination');
var Reserve = require('../models/reserve');
var Table = require('../models/table');

function getEvent(req, res){
    var eventId = req.params.id;
    Event.findById(eventId,(err, event)=>{
        if (err){
            res.status(500).send({message: "No se pudo buscar el evento"});
        }else{
            if(!event){
                res.status(404).send({message: "No existe el evento"});
            }else{
                res.status(200).send({event: event});
            }
        }
    });
    
}

function getEvents(req, res){
    
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPage = 3;

    Event.find().sort('date').paginate(page, itemsPage, function(err, events, total){
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!events){
                res.status(404).send({message: "No hay eventos"});
            }else{
                return res.status(200).send({
                    total: total,
                    events: events
                });
            }
        }
    });
}

function saveEvent(req,res){
    var event = new Event();
    var params = req.body;

    event.name = params.name;
    event.description = params.description;
    event.date = params.date;
    event.time = params.time;
    event.estate = params.estate;
    event.people = params.people;
    event.price = "0";
    event.reserve = params.reserve;
    event.table = params.table;

    event.save((err, eventStored) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!eventStored){
                res.status(404).send({message: 'El evento no ha sido guardado'});
            }else{
                res.status(200).send({event: eventStored});
            }
        }
    });

}

function updateEvent(req, res){
    var eventId = req.params.id;
    var update = req.body;

    Event.findByIdAndUpdate(eventId, update, (err, eventUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!eventUpdated){
                res.status(404).send({message: 'El evento no ha sido actualizado'});
            }else{
                res.status(200).send({event: eventUpdated});
            }
        }
    })

}

function deleteEvent(req, res){
    var eventId = req.params.id;
    Event.findByIdAndRemove(eventId,(err,eventRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor al eliminar evento'});
        }else{
            if(!eventRemoved){
                res.status(404).send({message: 'El evento no ha sido eliminado'});
            }else{
                res.status(200).send({event: eventRemoved});
                //Devuelvo el artista eliminado luego de haber eliminado
            }
        }
    });
}

function uploadImage(req, res){
    /*
    var artistId = req.params.id;
    var file_name = 'No subida';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var extension_file = ext_split[1];
        console.log(ext_split);

        if (extension_file ==  'jpg' || extension_file ==  'gif' || extension_file ==  'png')
        {
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err,artistUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error al actualizar la imagen de usuario'});//error de server
                }else{
                    if(!artistUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar la imagen'});//error de server
                    }else{
                        res.status(200).send({artist: artistUpdated});//Devuelvo el usuario con los datos actualizados
                    }
                }
            });
        }else{
            res.status(200).send({message: 'La extension del archivo a subir no es valida'});//Devuelvo el usuario con los datos actualizados
        }
    }else{
        res.status(404).send({message: 'No se ha subido ninguna imagen'});//error de server
    }
    */
}

function getImageFile(req, res){
    /*
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/artists/' + imageFile;
    
    fs.exists(pathFile, function(exists){
        if (exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'No existe la imagen'});//error de server
        }
    });
    */
}

module.exports={
    getEvent,
    saveEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    uploadImage, 
    getImageFile
};