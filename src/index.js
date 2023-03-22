const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const dotenv = require('dotenv');//this will make all the vars system vars present in that file

dotenv.config();

// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser:true })
//   .then(() => console.log('Connected'))
//   .catch(err => console.error('Connection error', err));


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser:true });//to avoid error {files are depricated somthing like that}
//process is a node method which has env property to ready system vars
const con = mongoose.connection;

con.on('open', () =>{
  console.log('Connected');
  app.listen(3000, () => {
    console.log("Listening on port : 3000");
  });
});//event raised on, which event close, open, error

const app =express();
app.use(cors());//this will add some headers in our response coming from API
app.use(express.json());
app.use('/users', userRouter);
app.use('/notes', notesRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});