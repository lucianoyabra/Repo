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
