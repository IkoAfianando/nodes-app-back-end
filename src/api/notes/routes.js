const {
  addNoteHandler, getAllNotesHandler, getNodeByIdHandler, editNoteByIdHandler, deleteByIdHandler,
} = require('./handler');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNodeByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteByIdHandler,

  },
];

module.exports = routes;
