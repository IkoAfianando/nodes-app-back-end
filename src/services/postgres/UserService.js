const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING $id',
      values: [id, username, hashedPassword, fullname],
    };

    // eslint-disable-next-line no-underscore-dangle
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = ({
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    });

    // eslint-disable-next-line no-underscore-dangle
    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('Gagal menambahkan users, Username sudah digunakan.');
    }
  }

  async getUserById(userId) {
    const query = ({
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [userId],
    });

    // eslint-disable-next-line no-underscore-dangle
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }
  }
}

module.exports = UsersService;
