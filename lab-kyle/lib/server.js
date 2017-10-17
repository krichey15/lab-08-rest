'use strict';

const http = require('http');
const router = require('./lib/router.js');

let isRunning = false;

const app = http.createServer(router.route);

module.exports = {
  start: () => {

    return new Promise((resolve, reject) => {
      if (!isRunning){
        app.listen(process.env.PORT, (err) => {
          if (err){
            reject(err);
          } else {
            isRunning = true;
            resolve(`Server up on port ${process.env.PORT}`);
          }
        });
      } else {
        reject('Server is already runnning');
      }
    });
  },

  stop: () => {
    return new Promise((resolve, reject) => {
      if (!isRunning) {

      }
    });
  },

};

// router.get('/', function(req,res){
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('Hello World');
//   res.end();
// })
//
// const server = http.createServer(function(req, res){
//   req.url = url.parse(req.url);
//   router.routes[req.method][req.url.pathname](req,res);
// });
//
// server.listen(3000);
