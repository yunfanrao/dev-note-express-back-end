const mongoose = require("mongoose");

var noteSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  archive: { type: Boolean, default: false },
  labels: [{type: String}]
});

noteSchema.index({ title : "text"})

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;