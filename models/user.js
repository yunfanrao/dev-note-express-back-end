const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Apply passportLocalMongoose plugin
userSchema.plugin( passportLocalMongoose, { usernameField: "email" } );

const User = mongoose.model("User", userSchema);

module.exports = User;