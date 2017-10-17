'use strict';

const Note = require('../model/data/noteModel.js');
const router = require('../lib/router.js');


let notes = [];

let sendStatus = (res, status, text) => {
  res.writeHead(status);
  res.write(text);
  res.end();
};

let sendJSON = (res, status, data) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
};

router.GET('api/notes', (req,res) => {
  let id = req.url && req.url.query && req.url.query.id;

  if(id) {
    let note = notes.filter( (note) => {
      return note.uuid === id;
    });
    if (note) {
      sendJSON(res, 200, note);
    } else {
      sendStatus(res, 400, 'Bad Request');
    }
  } else {
    let everyNote = {everyNote: notes};
    sendJSON(res, 200, everyNote);
  }
});

router.POST('api/notes', (req, res) => {
  if(!req.body.title) {
    return sendStatus (res, 400 , 'No Title Found');
  }
  if(!req.body.content) {
    return sendStatus(res, 400, 'No Content Found');
  }

  let note = new Note(req.body);
  notes.push(note);

});