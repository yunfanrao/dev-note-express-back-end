// const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;

// let userList = []

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String
// });

// const userModel = mongoose.model("User", userSchema);

// db.on('error', console.error.bind(console, 'connection error: '));

// db.once('open', () => {
//   console.log("Connected to mongoDB!");
// })

// userModel.find((err, foundUsers) => {
//   if(err) {
//     console.log("Unable to find users");
//   }
//   else {
//     userList = foundUsers;
//     console.log("foundUsers: " + foundUsers);
//   }
// });

// console.log("userList: " + userList);

// module.exports = userList;