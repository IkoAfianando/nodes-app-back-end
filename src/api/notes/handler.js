const notes = require("./notes");

class NotesHandler {
  constructor(service) {
    this._service = service;
  }

  postNoteHandler(request, h) {
    try {
      const {title = 'untitled', body, tags} = request.payload;

      const noteId = this._service.addNote({title, body, tags});

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    }catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      }
    }
  }

  getNoteIdByHandler(request, h) {
    try {
      const {id} = request.params;
      const note = this._service.getNoteBydId(id);
      return {
        status: 'success',
        data: {
          note,
        }
      };
    }catch (error){
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteIdByHandler(request, h) {
    try {
      const {id} = request.params;
      this._service.editNoteById(id, request.payload);
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      }
    }catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  deleteNoteIdByHandler(request, h) {
    try {
      const {id} = request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      }
    }catch(error) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan'
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;

// const { nanoid } = require('nanoid');
// const notes = require('./notes');
//
// const addNoteHandler = (request, h) => {
//   const { title, tags, body } = request.payload;
//
//   const id = nanoid(16);
//   const createdAt = new Date().toISOString();
//   const updatedAt = createdAt;
//
//   const newNote = {
//     title, tags, body, id, createdAt, updatedAt,
//   };
//
//   notes.push(newNote);
//
//   const isSuccess = notes.filter((note) => note.id === id).length > 0;
//
//   if (isSuccess) {
//     const response = h.response({
//       status: 'success',
//       message: 'Catatan berhasil ditambahkan',
//       data: {
//         noteId: id,
//       },
//     });
//     response.code(201);
//     return response;
//   }
//   const response = h.response({
//     status: 'fail',
//     message: 'Catatan gagal ditambahkan',
//   });
//   response.code(500);
//   return response;
// };
//
// const getAllNotesHandler = () => ({
//   status: 'success',
//   data: {
//     notes,
//   },
// });
//
// const getNodeByIdHandler = (request, h) => {
//   const { id } = request.params;
//
//   const note = notes.filter((n) => n.id === id)[0];
//
//   if (note !== undefined) {
//     return {
//       status: 'success',
//       data: {
//         note,
//       },
//     };
//   }
//
//   const response = h.response({
//     status: 'fail',
//     message: 'Catatan tidak ditemukan',
//   });
//
//   response.code(404);
//   return response;
// };
//
// const editNoteByIdHandler = (request, h) => {
//   const { id } = request.params;
//
//   const { title, tags, body } = request.payload;
//   const updateAt = new Date().toISOString();
//
//   const index = notes.findIndex((note) => note.id === id);
//
//   if (index !== -1) {
//     notes[index] = {
//       ...notes[index],
//       title,
//       tags,
//       body,
//       updateAt,
//     };
//
//     const response = h.response({
//       status: 'success',
//       message: 'Catatan berhasil diperbarui',
//     });
//     response.code(200);
//     return response;
//   }
//
//   const response = h.response({
//     status: 'fail',
//     message: 'Gagal membuat catan, id tidak ditemukan',
//   });
//   response.code(404);
//   return response;
// };
//
// const deleteByIdHandler = (request, h) => {
//   const { id } = request.params;
//
//   const index = notes.findIndex((note) => note.id === id);
//
//   if (index !== -1) {
//     notes.splice(index, 1);
//     const response = h.response({
//       status: 'success',
//       message: 'Catatan berhasil dihapus',
//     });
//     response.code(200);
//     return response;
//   }
//
//   const response = h.response({
//     status: 'fail',
//     message: 'Catatan gagal dihapus',
//   });
//   response.code(404);
//   return response;
// };
//
// module.exports = {
//   addNoteHandler, getAllNotesHandler, getNodeByIdHandler, editNoteByIdHandler, deleteByIdHandler,
// };
