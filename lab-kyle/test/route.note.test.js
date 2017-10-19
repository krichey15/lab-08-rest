'use strict';

const expect = require('expect');

process.env.PORT = 5500;
const server = require('../lib/server');
const superagent = require('superagent');

describe('api/notes', function() {

  beforeEach( () => {
    console.log('in beforeEach');
    return server.start(process.env.PORT);
  });

  afterEach( () => {
    console.log('in afterEach');
    return server.stop();
  });

  describe('POST /api/notes', () => {

    test('should respond with a 201', () => {
      return superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send( {
          title:'Hello World!',
          content: 'First Try!',
        })
        .then( res => {
          expect(res.status).toEqual(201);
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
