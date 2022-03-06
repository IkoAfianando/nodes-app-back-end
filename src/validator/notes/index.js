/* eslint-disable linebreak-style */
const { notesPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = notesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;
