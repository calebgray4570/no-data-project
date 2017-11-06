const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      data = require('./data.js')
      // data2 = require('./data2.js')
      port = 3001


const app = express();
app.use( bodyParser.json() );
app.use( cors() );
// app.use( data.json());

// console.log('hi')
app.get('/aboutInfo', function(req, res ) {
      res.status(200).send( data.aboutData.about )
} )

app.get('/tourInfo', (req, res) => {
      res.status(200).send( data.tourData )
})

app.get('/storeInfo', function(req, res ) {
      res.status(200).send( data.storeData )
} )

app.post('/email/', (req, res) => {
      data.updateEmail.push(req.body.email)
      res.status(200).send(data.updateEmail)
})




app.listen( port, () => { console.log(`server listening on ${ port }.`); } )