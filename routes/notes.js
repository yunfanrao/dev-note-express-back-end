const express = require("express");
const router = express.Router();

const NoteModel = require("../models/note");
//console.log(NoteModel);

router.get("/list", async (req, res) => {
  try {
    const filter = {
      $or: [
        { archive: { $exists: false } },
        { archive: false }
      ]
    };
    await NoteModel.find(filter, (error, foundNotes) => {
      let notes = []
      if (error) {
        console.log("Unable to find notes: " + error);
      }
      else {
        notes = foundNotes;
        //console.log(foundNotes);
        res.status(200).json({
          data: notes
        });
      }
    });
  }
  catch (error) {
    res.status(400).json({
      message: "Some error occured",
      error
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newNote = new NoteModel({
      title: req.body.title,
      content: req.body.content,
      labels: req.body.labels
    });
    console.log("newNote is " + newNote);
    await newNote.save((err, savedNewNote) => {
      if (err) {
        console.log("Not able to save the new note: " + err);
      }
      else {
        console.log("Saved new note:" + savedNewNote);
        res.status(200).json({
          status: "Success!"
        });
      }
    });
  }
  catch (error) {
    res.status(400).json({
      message: "Some error occured",
      error
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("Trying to delete note which id is " + id);
    await NoteModel.findByIdAndDelete(id, (err) => {
      if (err) {
        console.log("Not able to delete the note: " + err);
      }
      else {
        console.log("Deleted the note!");
        res.status(200).json({
          status: "Success!"
        });
      }
    });
  }
  catch (error) {
    res.status(400).json({
      message: "Some error occured",
      error
    });
  }
});

module.exports = router;