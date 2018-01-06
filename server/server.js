var express = require('express')
var app = express()
var jsonServer = require('json-server')
var port = process.env.PORT || 8080

app.use('/api', jsonServer.router('db.json'))
app.use(express.static('../web'))
app.listen(port)
console.log('Listening on port ' + port)
