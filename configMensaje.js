//'use strict'

const nodemailer = require('nodemailer');


function send(formulario){
 var transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  secureConnection: true, // use SSL
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth:{
    user: "lucianoyabra@gmail.com",
    pass: "Sashita9"
  }
 });

/*
    host:"in-v3.mailjet.com",
    port:587,
    auth:{
      user: "4cbd5249f600247cbc93feb7ea46f022",
      pass: "53de9b997c3a99b37cc1911a2d3ec44f"
    }
  });
*/

const mailOptions = {
 from: '<'+ formulario.email + '>',
 to: 'luchoyabra@hotmail.com', // Cambia esta parte por el destinatario
 subject: formulario.asunto,
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
 console.log('mensaje desde el configMensaje');


transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });

}

module.exports = {
send
}



/*

const mailjet = require ('node-mailjet')
.connect('4cbd5249f600247cbc93feb7ea46f022', '53de9b997c3a99b37cc1911a2d3ec44f')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "lucianoyabra@gmail.com",
        "Name": "Luciano"
      },
      "To": [
        {
          "Email": "lucianoyabra@gmail.com",
          "Name": "Luciano"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })


*/
