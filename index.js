var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var qr = require ('qr-image');

var code = qr.image('http://www.google.com', { type: 'svg' });
var output = fs.createWriteStream('nodejitsu.svg')
code.pipe(output);

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
httpsServer.listen(8443);

app.get('/', function (req,res,next){
//	res.sendFile(__dirname + '/index.html');
	 var code = qr.image(new Date().toString(), { type: 'svg' });
  res.type('svg');
  code.pipe(res);
});