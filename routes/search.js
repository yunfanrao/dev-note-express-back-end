const express = require("express");
const router = express.Router();

const NoteModel = require("../models/note");

router.get("/notes/:searchString", async (req, res) => {
  try {
    const searchString = req.params.searchString
    await NoteModel.find({$text: {$search: searchString}}, (error, foundNotes) => {
      let notes = []
      if (error) {
        console.log("Unable to search notes: " + error);
      }
      else {
        notes = foundNotes;
        res.status(200).json({
          data: notes,
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