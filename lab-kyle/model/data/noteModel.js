'use strict';

const uuid = require('uuid/v1');

class Note {

  constuctor(config){
    this.id = uuid();
    this.createdOn = new Date();
    this.title = config.title || '';
    this.content = config.content || '';
  }
}

module.exports = Note;
