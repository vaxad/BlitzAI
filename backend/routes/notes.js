const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE 1: fetch all notes using: GET '/api/notes/fetch'
router.get('/fetch', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

//ROUTE 2: add new note using: POST '/api/notes/'
router.post('/', fetchuser, [
    body('title', 'Enter a valid Title').exists(),
    body('content', 'Enter valid Content').exists()
], async (req, res) => {
    try {

        const { title, content } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const savedNote = await Note.create({
            title, content,
            user: req.user.id,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        return res.json(savedNote);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 3: update a note using: PUT '/api/notes/:id'
router.put('/:id', fetchuser, async (req, res) => {
    try {

        const { title, content } = req.body;
        //store what user wants to update
        const newNote = {};
        if (title) { newNote.title = title }
        if (content) { newNote.content = content };
        newNote.updatedAt = Date.now();

        //VERIFY USER
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //update note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 4: delete a note using: DELETE '/api/notes/:id'
router.delete('/:id', fetchuser, async (req, res) => {
    try {

        //VERIFY USER
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        //delete note
        note = await Note.findByIdAndDelete(req.params.id);
        return res.json({ message: "This note was deleted", note });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 5: fetch note by id using: GET '/api/notes/fetch/:id'
router.get('/fetch/:id', fetchuser, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ error });
    }

})

module.exports = router;