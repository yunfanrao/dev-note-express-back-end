const express = require("express");
const router = express.Router();

const NoteModel = require("../models/note");
console.log(NoteModel);

router.get("/list", async (req, res) => {
  try {
    const filter = {
      $and: [
        { archive: { $exists: true } },
        { archive: true }
      ]
    };
    await NoteModel.find(filter, (error, foundNotes) => {
      let notes = []
      if (error) {
        console.log("Unable to find notes: " + error);
      }
      else {
        notes = foundNotes;
        console.log(foundNotes);
      }
      res.status(200).json({
        data: notes
      });
    });
  }
  catch (error) {
    res.status(400).json({
      message: "Some error occured",
      error
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("Trying to get the archive field of the note which id is " + id);
    await NoteModel.findById(id, (err, foundNote) => {
      if(err) {
        console.log("Not able to get the archive field of the note: " + err);
      }
      else {
        console.log("Found the note!");
        let archived = false
        if(foundNote.archive) {
          archived = true
        }
        res.status(200).json({
          archived: archived,
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

router.put("/toggle/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("Trying to toggle the archieve field of the note which id is " + id);
    await NoteModel.findById(id, (err, foundNote) => {
      if(err) {
        console.log("Not able to toggle the archieve field: " + err);
      }
      else {
        foundNote.archive = !foundNote.archive;
        foundNote.save( (saveErr) => {
          if(!saveErr) {
            console.log("Toggled the archive field!");
            res.status(200).json({
              status: "Success!"
            });
          }
          else {
            console.log("Failed to toggle the archive field: " + saveErr);
          }
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

router.put("/archive/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("Trying to archive note which id is " + id);
    const update = { archive: true };
    await NoteModel.findByIdAndUpdate(id, update, (err) => {
      if(err) {
        console.log("Not able to archive the note: " + err);
      }
      else {
        console.log("Archived the note!");
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

router.put("/unarchive/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("Trying to unarchive note which id is " + id);
    const update = { archive: false };
    await NoteModel.findByIdAndUpdate(id, update, (err) => {
      if(err) {
        console.log("Not able to unarchive the note: " + err);
      }
      else {
        console.log("Unarchived the note!");
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