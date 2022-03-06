/* eslint-disable linebreak-style */
const joi = require('joi');

const notesPayloadSchema = joi.object({
  title: joi.string().required(),
  body: joi.string().required(),
  tags: joi.array().items(joi.string()).required(),
});

module.exports = { notesPayloadSchema };
