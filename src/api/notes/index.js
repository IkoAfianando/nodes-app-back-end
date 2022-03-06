/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const NotesHandler = require('./handler');
// eslint-disable-next-line linebreak-style
const routes = require('./routes');

module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const notesHandler = new NotesHandler(service, validator);
    server.route(routes(notesHandler));
  },
};
