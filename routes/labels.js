const express = require("express");
const router = express.Router();

const NoteModel = require("../models/note");
//console.log(NoteModel);

router.get("/list/notes/id/:id", async (req, res) => {
  try {
    const id = req.params.id
    console.log("Trying to list labels of the note which id is " + id);
    await NoteModel.findById(id, (err, foundNote) => {
      if(err) {
        console.log("Not able to list labels: " + err);
      }
      else {
        console.log("Listed the labels!");
        res.status(200).json({
          labels: foundNote.labels,
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

router.get("/list/all", async (req, res) => {
  try {
    console.log("Trying to list all labels");
    const filter = [
      { $match: { 
        $or: [
          { archive: { $exists: false } },
          { archive: false }
        ]}
      },
      { $unwind: "$labels" },
      { $group: {
        _id: null,
        allLabels: {$addToSet: "$labels"}
      }}
    ];
    await NoteModel.aggregate(filter, (err, result) => {
      if(err) {
        console.log("Not able to list labels: " + err);
      }
      else {
        console.log("Listed the labels!");
        res.status(200).json({
          allLabels: result[0].allLabels.sort(),
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

router.get("/list/notes/label/:labelName", async (req, res) => {
  try {
    const labelName = req.params.labelName;
    const filter = {
      $or: [
        { archive: { $exists: false }, labels: { $elemMatch: { $eq: labelName } } },
        { archive: false, labels: { $elemMatch: { $eq: labelName } } }
      ]
    };
    console.log("Trying to list notes that have label " + labelName);
    await NoteModel.find(filter, (err, foundNotes) => {
      if(err) {
        console.log("Not able to list labels: " + err);
      }
      else {
        console.log("Listed the labels!");
        res.status(200).json({
          notes: foundNotes,
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

router.put("/add/:id/:newLabel", async (req, res) => {
  try {
    const id = req.params.id;
    const newLabel = req.params.newLabel;
    console.log("Trying to add a new label to the note which id is " + id);
    await NoteModel.findById(id, (err, foundNote) => {
      if(err) {
        console.log("Not able to add a new label: " + err);
      }
      else if(foundNote.labels.includes(newLabel)) {
        res.status(409).json({
          message: newLabel + " is already existed!",
          error: "Conflicted"
        });
      }
      else {
        foundNote.labels.push(newLabel);
        foundNote.save( (saveErr) => {
          if(!saveErr) {
            console.log("Updated the labels field!");
            res.status(200).json({
              status: "Success!"
            });
          }
          else {
            console.log("Failed to add a new label: " + saveErr);
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

router.delete("/delete/:id/:labelToDelete", async (req, res) => {
  try {
    const id = req.params.id;
    const labelToDelete = req.params.labelToDelete;
    console.log("Trying to delete a label from the note which id is " + id);
    await NoteModel.findById(id, (err, foundNote) => {
      if(err) {
        console.log("Not able to delete a label: " + err);
      }
      else {
        foundNote.labels = foundNote.labels.filter( label => label != labelToDelete);
        foundNote.save( (saveErr) => {
          if(!saveErr) {
            console.log("Deleted the label!");
            res.status(200).json({
              status: "Success!"
            });
          }
          else {
            console.log("Failed to delete a label: " + saveErr);
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

module.exports = router;