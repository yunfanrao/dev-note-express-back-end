const express = require("express");
const router = express.Router();

const NoteModel = require("../models/note");
//console.log(NoteModel);

router.get("/notes/:searchString", async (req, res) => {
  try {
    const searchString = req.params.searchString
    console.log("Trying to search notes with " + searchString);
    await NoteModel.find({ $text : { $search : searchString }}, (err, foundNotes) => {
      let notes = []
      if(err) {
        console.log("Not able to search notes: " + err);
      }
      else {
        notes = foundNotes
        console.log("Found the notes!");
        res.status(200).json({
          result: notes,
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