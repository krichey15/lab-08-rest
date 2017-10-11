'use strict';

const http = require('http');
const url = require('url');
const router = require('app.js');

router.get('/', function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  res.end();
})

const server = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  router.routes[req.method][req.url.pathname](req,res);
});

server.listen(3000);
