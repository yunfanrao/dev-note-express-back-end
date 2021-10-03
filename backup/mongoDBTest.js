const express = require("express");
const router = express.Router();

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error: '));

// db.once('open', () => {
//   console.log("Connected to mongoDB!");
// })

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String
// });

// const userModel = mongoose.model("User", userSchema);
const userModel = require("./user");
console.log(userModel);

// let users = require("../mongoDB");

router.get("/users/list", async (req, res) => {
  try {
    await userModel.find((error, foundUsers) => {
      let users = []
      if (error) {
        console.log("Unable to find users: " + error);
      }
      else {
        users = foundUsers;
        console.log(foundUsers);
      }
      res.status(200).json({
        data: users
      });
    });
  }
  catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;