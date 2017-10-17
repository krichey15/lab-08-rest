'use strict';

const url = require('url');
const queryString = require('query-string');

module.exports = (req) = {

    //When I run "node index.js" in the command line it comes back with an error that it has an unexpected token "new", refering to the "new Promise..."

    return new Promise( (resolve, reject) => {

    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (!(req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH')){
      resolve(req);
    }

    let text = "";

    req.on('data', (buffer) => {
      text += buffer.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(text);
      } catch (err){
        console.log(err);
        reject(err);
      }
    });
    req.on('error', reject);
  });
};
