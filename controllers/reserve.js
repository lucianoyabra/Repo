'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePagination = require('mongoose-pagination');
var Reserve = require('../models/reserve');
var Table = require('../models/table');

function getReserve(req, res){
    var reserveId = req.params.id;
    Reserve.findById(reserveId,(err, reserve)=>{
        if (err){
            res.status(500).send({message: "No se pudo buscar la reserva"});
        }else{
            if(!reserve){
                res.status(404).send({message: "No existe la reserva"});
            }else{
                res.status(200).send({reserve :reserve});
            }
        }
    });

}

function getReserves(req, res){
    /*
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPage = 3;

    Reserve.find().sort('date').paginate(page, itemsPage, function(err, reserves, total){
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!reserves){
                res.status(404).send({message: "No hay reservas"});
            }else{
                return res.status(200).send({
                    total: total,
                    reserves: reserves,
                    datenew: (new Date(Date.now()).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z',
                    date: new Date(Date.now()).getUTCFullYear().toString() + '-' + (new Date(Date.now()).getUTCMonth() +1) + '-'+ new Date(Date.now()).getUTCDate() + 'T00:00:00.000Z'
                });
            }
        }
    });

*/
   Reserve.find({'date': (new Date(Date.now()).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z'}).sort('time').exec(function(err,reserves,total){
    if(err){
        res.status(500).send({message: "Error en el servidor"});
    }else{
        if(!reserves){
            res.status(404).send({message: "No hay reservas"});
        }else{
            var x = (new Date(Date.now()).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z';
            return res.status(200).send({
                total: total,
                reserves: reserves,
                datenew: (new Date(Date.now()).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z',
                date: new Date(Date.now()).getUTCFullYear().toString() + '-' + (new Date(Date.now()).getUTCMonth() +1) + '-'+ new Date(Date.now()).getUTCDate() + 'T00:00:00.000Z'
            });
        }
    }
   });
    /*Reserve.find(function(err, reserves, total){
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!reserves){
                res.status(404).send({message: "No hay reservas"});
            }else{
                return res.status(200).send({reserves: reserves});
            }
        }
    }).sort('date');*/
}

function getReservesDate(req, res){

  if(req.params.date){
      var date = req.params.date;
  }else{
    res.status(404).send({message: "No hay fecha"});
  }


 Reserve.find({'date': (new Date(date).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z' }).sort('time').exec(function(err,reserves,total){
  if(err){
      res.status(500).send({message: "Error en el servidor"});
  }else{
      if(!reserves){
          res.status(404).send({message: "No hay reservas"});
      }else{
          var x = (new Date(Date.now()).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z';
          return res.status(200).send({
              total: total,
              reserves: reserves,
              datenew: (new Date(Date.now()).toISOString().toString()).substr(0,10) + 'T00:00:00.000Z',
              date: date
          });
      }
  }
 });
  /*Reserve.find(function(err, reserves, total){
      if(err){
          res.status(500).send({message: "Error en la peticion"});
      }else{
          if(!reserves){
              res.status(404).send({message: "No hay reservas"});
          }else{
              return res.status(200).send({reserves: reserves});
          }
      }
  }).sort('date');*/
}

function saveReserve(req,res){
    var reserve = new Reserve();
    var params = req.body;

    reserve.name = params.name;
    reserve.email = params.email;
    reserve.phone = params.phone;
    reserve.date = params.date;
    reserve.time = params.time;
    reserve.people = params.people;

    reserve.save((err, reserveStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar la reserva'});
        }else{
            if(!reserveStored){
                res.status(404).send({message: 'La reserva no ha sido guardada'});
            }else{
                res.status(200).send({reserve: reserveStored});
            }
        }
    });

}

function updateReserve(req, res){
    var reserveId = req.params.id;
    var update = req.body;

    Reserve.findByIdAndUpdate(reserveId, update, (err, reserveUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar la reserva'});
        }else{
            if(!reserveUpdated){
                res.status(404).send({message: 'La reserva no ha sido actualizada'});
            }else{
                res.status(200).send({reserve: reserveUpdated});
            }
        }
    })

}

function deleteReserve(req, res){
    var reserveId = req.params.id;
    Reserve.findByIdAndRemove(reserveId,(err,reserveRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!reserveRemoved){
                res.status(404).send({message: 'La reserva no ha sido eliminada'});
            }else{
                res.status(200).send({reserve: reserveRemoved});
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

module.exports = {
    getReserve,
    saveReserve,
    getReserves,
    getReservesDate,
    updateReserve,
    deleteReserve,
    uploadImage,
    getImageFile
};
