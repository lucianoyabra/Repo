'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePagination = require('mongoose-pagination');
var Salon = require('../models/salon');
var Table = require('../models/table');
var configMensaje = require('../configMensaje');
/*
var nodemailer = require("nodemailer");

function getSalon(req,res){
    var salonId = req.params.id;
    Salon.findById(salonId,(err, salon)=>{
        if (err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!salon){
                res.status(404).send({message: "No existe el salon"});
            }else{
                res.status(200).send({salon: salon});
            }
        }
    });
}


function sendMail(req, res){

    console.log('va a mandar el req.body desde salon.js: ' + req.body);
    mail(req.body);
    res.status(200).send({message: "mensaje enviado"});

}

function mail(user){
  const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "lucianoyabra@gmail.com",
        pass: "Sashita9"
      }
    });
  }

  const mailOptions = {
    from: `"Lucho", "luchoyabra@hotmail.com"`,
    to: `luchoyabra@hotmail.com`,
    subject: "Asunto del mail",
    html: "<h1>And here is the place for HTML</h1>"
  };

  transporter.sendMail(mailOptions, callback);
}
*/


function getSalon(req,res){
    var salonId = req.params.id;
    Salon.findById(salonId, (err, salon)=>{
        if (err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!salon){
                res.status(404).send({message: "No existe el salon"});
            }else{
                res.status(200).send({salon: salon});
            }
        }
    });
}
function saveSalon(req,res){
    var salon = new Salon();
    var params = req.body;

    salon.description = params.description;
    salon.date = params.date;
    // salon.id = params.id;

    salon.save((err,salonStored)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!salonStored){
                res.status(404).send({message: 'No se ha guardado el salon'});
            }else{
                res.status(200).send({salon: salonStored});
            }
        }
    });
}

function getSalones(req,res){
    var salonId = req.params.id;
    if (salonId === null || salonId === '' || salonId === undefined ){
    Salon.find((err, salones)=>{
        if (err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!salones){
                res.status(404).send({message: "No hay salones"});
            }else{
                res.status(200).send({salones: salones});
            }
        }
    });
    }else{
        Salon.findById(salonId, (err, salones)=>{
            if (err){
                res.status(500).send({message: "Error en el servidor"});
            }else{
                if(!salones){
                    res.status(404).send({message: "No hay salones"});
                }else{
                    res.status(200).send({salones: salones});
                }
            }
        });
    }
}


function deleteSalon(req,res){
    var salonId = req.params.id;

    Salon.findByIdAndRemove(salonId,(err,salonRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!salonRemoved){
                res.status(404).send({message: 'No se pudo eliminar el Salon'});
            }else{
                Table.find({salon: salonRemoved._id}).remove((err, tableRemoved)=>{
                    if(err){
                        res.status(500).send({message: 'Error en el servidor al eliminar mesas'});
                    }else{
                        if(!tableRemoved){
                            res.status(404).send({message: 'Las mesas no han sido eliminadas'});
                        }else{
                            res.status(200).send({salon: salonRemoved});//Devuelvo el artista eliminado luego de haber eliminado
                                                                        //Todos sus albums y canciones
                        }
                    }
                });



            }
        }
    });
}




function updateSalon(req,res){
    var salonId = req.params.id;

    Salon.findByIdAndUpdate(salonId,(err,salonRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!salonRemoved){
                res.status(404).send({message: 'No se pudo eliminar el Salon'});
            }else{
                res.status(200).send({salon: salonRemoved});
            }
        }
    });
}

module.exports = {
    getSalon,
    getSalones,
    saveSalon,
    deleteSalon,
    updateSalon
};
