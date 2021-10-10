const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  archive: { type: Boolean, default: false },
  labels: [{type: String}]
});

// add text index, note that "text" must be double quoted
noteSchema.index({title: "text"});

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;