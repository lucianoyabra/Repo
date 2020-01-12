'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePagination = require('mongoose-pagination');
var Table = require('../models/table');

function getTable(req,res){
    var tableId = req.params.id;
    Table.findById(tableId,(err, table)=>{
        if (err){
            res.status(500).send({message: "No se pudo buscar la mesa"});
        }else{
            if(!table){
                res.status(404).send({message: "No existe mesa"});
            }else{
                res.status(200).send({table: table});
            }
        }
    });
}

function saveTable(req,res){
    var table = new Table();
    var params = req.body;

    table.number = params.number;
    table.capacity = params.capacity;
    table.description = params.description;
    table.positionX = params.positionX;
    table.positionY= params.positionY;
    table.salon = params.salon;
    // table.id = params.id;

    table.save((err,tableStored)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!tableStored){
                res.status(404).send({message: 'No se ha guardado la cancion'});
            }else{
                res.status(200).send({table: tableStored});
            }
        }
    });
}

function getTables(req,res){
    var salonId = req.params.id;
    if(!salonId){
        var find = Table.find().sort('number');
    }else{
        var find = Table.find({salon: salonId}).sort('number');
    }
    find.populate({
       path: 'salon',
    }).exec(function(err, tables){
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!tables){
                res.status(404).send({message: 'No hay mesas'});
            }else{
                res.status(200).send({tables:tables});
            }
        }
    });
}

function updateTable(req,res){
    var tableId = req.params.id;
    var update = req.body;
    var tableUpdate = new Table();

    tableUpdate.positionX = req.body.positionX;
    tableUpdate.positionY = req.body.positionY;
    tableUpdate.number = req.body.number;
    tableUpdate.capacity = req.body.capacity;
    tableUpdate.description = req.body.description;
    tableUpdate.salon = req.body.salon;
    alert('ya asigno table update');
    Table.findByIdAndUpdate(tableId, tableUpdate,(err,tableUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!tableUpdated){
                res.status(404).send({message: 'No se pudo actualizar la cancion'});
            }else{
                res.status(200).send({table: tableUpdated});
            }
        }
    });
}

function deleteTable(req,res){
    var tableId = req.params.id;
    if(!tableId){
        Table.remove((err,tableRemoved)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!tableRemoved){
                    res.status(404).send({message: 'No se pudo eliminar la cancion'});
                }else{
                    res.status(200).send({table: tableRemoved});
                }
            }
        });
    }else{
        Table.findByIdAndRemove(tableId,(err,tableRemoved)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(!tableRemoved){
                    res.status(404).send({message: 'No se pudo eliminar la cancion'});
                }else{
                    res.status(200).send({table: tableRemoved});
                }
            }
        });
    }
}


function uploadFile(req, res){
    /*
    var tableId = req.params.id;
    var file_name = 'No subida';

    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var extension_file = ext_split[1];
        console.log(ext_split);

        if (extension_file ==  'mp3' || extension_file ==  'wma')
        {
            Song.findByIdAndUpdate(songId, {file: file_name}, (err,songUpdated) => {
                if(err){
                    res.status(500).send({message: 'Error del servidor'});//error de server
                }else{
                    if(!songUpdated){
                        res.status(404).send({message: 'No se ha podido subir la cancion'});//error de server
                    }else{
                        res.status(200).send({song: songUpdated});//Devuelvo el usuario con los datos actualizados
                    }
                }
            });
        }else{
            res.status(200).send({message: 'La extension del archivo a subir no es valida'});//Devuelvo el usuario con los datos actualizados
        }
    }else{
        res.status(404).send({message: 'No se ha subido ninguna cancion'});//error de server
    }
    */
}

function getTableFile(req, res){
    var songFile = req.params.songFile;
    var pathFile = './uploads/songs/' + songFile;
    
    fs.exists(pathFile, function(exists){
        if (exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'No existe el fichero de audio'});//error de server
        }
    });
}


module.exports = {
    getTable,
    getTables,
    saveTable,
    updateTable,
    deleteTable,
    uploadFile,
    getTableFile
};