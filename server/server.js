var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var jsonServer = require('json-server');
var port = process.env.PORT || 3000;




app.use('/api', jsonServer.router('db.json'));
//app.use(require('./routes'))
app.use(express.static('dist/web'))

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
