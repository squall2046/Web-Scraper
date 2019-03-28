const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    note: Array
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;