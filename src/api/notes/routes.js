const {
  postNoteHandler, getNotesHandler, getNoteByIdHandler, putNoteByIdHandler, deleteNoteByIdHandler,
} = require('./handler');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNoteIdByHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteIdByHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteIdByHandler,

  },
];

module.exports = routes;
