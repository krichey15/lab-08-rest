'use strict';

const expect = require('expect');
const mocha = require('mocha');

process.env.PORT = 5500;
const server = require('../lib/server');
const superagent = require('superagent');

describe('api/notes', function() {


//Tried to figure out why my linter is saying beforeAll is not defined... Is it not a function from mocha?
  beforeAll(server.start);
  afterAll(server.stop);

  describe('POST /api/notes', () => {

    test('should respond with a 200', () => {
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send( {
          title:'Hello World!',
          content: 'First Try!',
        })
        .then( res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('Hello World!');
          expect(res.body.content).toEqual('First Try!');
        });
    });

    test('should respond with a 400 if no content', () =>{
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send({
          content: 'First Try!',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    test('should respond with a 400 if no title', () =>{
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send({
          title: 'Hello World!',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
}); 
