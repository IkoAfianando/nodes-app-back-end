const {notesPayloadSchema} = require("./schema");

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = notesPayloadSchema.validate(payload);
        if(validationResult.error) {
            throw new Error(NotesValidator.error.message);
        }
    }
};

module.exports = NotesValidator;