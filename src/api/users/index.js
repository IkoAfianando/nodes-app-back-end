const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    // eslint-disable-next-line no-unused-vars
    const usersHandler = new UsersHandler(service, validator);
    // eslint-disable-next-line no-undef
    server.route(routes(usersHandler));
  },
};
