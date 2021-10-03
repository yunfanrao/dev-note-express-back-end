const express = require("express");
const app = express();
const cors = require("cors");
//const bodyParser = require("body-parser");
const logger =  require("morgan");
// const playersRouter = require("./backup/players");
// const usersRouter = require("./backup/mongoDBTest");
const notesRouter = require("./routes/notes");
const archiveRouter = require("./routes/archive");
const labelsRouter = require("./routes/labels");

const port = process.env.PORT || 3001;

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/noteDB', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//mongoose.set('bufferCommands', false);

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', () => {
  console.log("Connected to mongoDB!");
})

app.use(cors());

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(logger('dev'));
// app.use("/players", playersRouter);
// app.use("/mongoDBTest", usersRouter);
app.use("/notes", notesRouter);
app.use("/labels", labelsRouter);
app.use("/archive", archiveRouter);

app.listen(port, () => {
    console.log("Dev-Note back end is running on " + port);
});

module.exports = app;
