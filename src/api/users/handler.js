const ClientError = require('../../exceptions/ClientError');
// eslint-disable-next-line no-unused-vars
const InvariantError = require('../../exceptions/InvariantError');

class UserHandler {
  constructor(service, validator) {
    // eslint-disable-next-line no-underscore-dangle,new-cap
    this._service = service;
    // eslint-disable-next-line new-cap,no-underscore-dangle
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  // eslint-disable-next-line consistent-return
  async postUserHandler(request, h) {
    try {
      // eslint-disable-next-line no-underscore-dangle
      this._validator.validateUserPayload(request.payload);
      const { username, password, fullname } = request.payload;

      // eslint-disable-next-line no-underscore-dangle
      const userId = await this._service.addUser({ username, password, fullname });

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getUserByIdHandler(request, h) {
    try {
      const { id } = request.params;
      // eslint-disable-next-line no-underscore-dangle
      const user = await this._service.getUserById(id);

      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
module.exports = UserHandler;
