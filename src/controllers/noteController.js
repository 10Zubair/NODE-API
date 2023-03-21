const noteModel = require('../models/note');

const createNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new noteModel({
    title: title,
    description: description,
    userId: req.userId
  });
  try {
    await newNote.save();
    res.status(201).json(newNote);
    
  } catch (error) {
    res.status(500).json('Somthing went wrong');
  }
}

const getNote = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId : req.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json('Somthing went wrong');
  }
}

const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const newNote = {
    title: title,
    description: description,
    userId: req.userId
  }

  try {
    await noteModel.findByIdAndUpdate(id, newNote, { new : true });//this first update then show
    res.status(200).json(newNote);
  } catch (error) {
    res.status(500).json("Somthing went wrong");
  }

}

const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const removenote = await noteModel.findByIdAndRemove(id);
    res.status(200).json(removenote);
  } catch (error) {
    res.status(500).json('Somthing went wrong');
  }
}

module.exports = {
  createNote,
  getNote,
  updateNote,
  deleteNote
}