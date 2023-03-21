const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const url = 'mongodb://localhost/UsersDB';
mongoose.connect(url, { useNewUrlParser:true });//to avoid error {files are depricated somthing like that}

const con = mongoose.connection;

con.on('open', () =>{
  console.log('Connected');
  app.listen(3000, () => {
    console.log("Listening on port : 3000");
  });
} );//event raised on, which event close, open, error

const app =express();
app.use(express.json());
app.use('/users', userRouter);
app.use('/notes', notesRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});