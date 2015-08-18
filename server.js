'use strict';

//process.env.TZ = 'Asia/Seoul';
var bodyParser = require('body-parser');
var config = require('./config/app.json');
var database = require('./database');
var express = require('express');
var fs = require('fs');
var handler = require('./handler');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function handle(req, res) {
  handler.handle(req, res);
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/:action(*)', handle);
app.post('/:action(*)', handle);

var server = app.listen(config.port, function () {
  database.initialize(function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });
});
