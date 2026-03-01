const express = require('express');
const Note = require('../models/Note');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
router.use(authMiddleware);

function toClientNote(noteDoc) {
  return {
    id: noteDoc._id.toString(),
    title: noteDoc.title,
    content: noteDoc.content,
    tags: noteDoc.tags,
    isArchived: noteDoc.isArchived,
    lastEdited: noteDoc.updatedAt,
  };
}

router.get('/', async (req, res) => {
  const notes = await Note.find({ owner: req.user.id }).sort({ updatedAt: -1 });
  return res.json(notes.map(toClientNote));
});

router.post('/', async (req, res) => {
  const { title = '', content = '', tags = [], isArchived = false } = req.body;

  const note = await Note.create({
    owner: req.user.id,
    title,
    content,
    tags,
    isArchived,
  });

  return res.status(201).json(toClientNote(note));
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const updates = {};
  const allowedKeys = ['title', 'content', 'tags', 'isArchived'];
  for (const key of allowedKeys) {
    if (key in req.body) {
      updates[key] = req.body[key];
    }
  }

  const note = await Note.findOneAndUpdate(
    { _id: id, owner: req.user.id },
    updates,
    { new: true }
  );

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json(toClientNote(note));
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deleted = await Note.findOneAndDelete({ _id: id, owner: req.user.id });
  if (!deleted) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.status(204).send();
});

module.exports = router;
