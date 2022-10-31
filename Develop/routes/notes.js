const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET route for retrieving notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const {title, note} = req.body;

    if (req.body) {
    const newNote = {
        title,
        note,
        note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
    } else {
    res.error('Error in adding note');
    }
});

notes.delete('/api/notes/:id', (req, res) => {
    notes.splice(req.params.id, 1);

    fs.writeFileSync('db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Note Deleted");
        }
})});

module.exports = notes