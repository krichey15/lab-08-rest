'use strict';

const url = require('url');
const queryString = require('query-string');

module.exports = (req) => {

    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (!(req.method === 'PUT' || req.method === 'POST' || req.method === 'PATCH')){
      resolve(req);
    }

    let text = '';

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
