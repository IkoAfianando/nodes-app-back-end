const {addNoteHandler, getAllNotesHandler, getNodeByIdHandler, } = require("./handler");
const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNodeByIdHandler
    }
];

module.exports = routes;