const express = require('express');
const { getNote, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const notesRouter = express.Router();
const auth = require('../middlewares/auth');

notesRouter.get('/', auth, getNote);//it will check auth first
notesRouter.post('/', auth, createNote);
notesRouter.put('/:id', auth, updateNote);
notesRouter.delete('/:id', auth, deleteNote);

module.exports = notesRouter;