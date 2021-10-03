const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  archive: { type: Boolean, default: false },
  labels: [{type: String}]
});

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;