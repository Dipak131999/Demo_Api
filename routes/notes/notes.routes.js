const express = require("express");
const router = express.Router();
const { notesControllers } = require("../../controllers");

router.get("/list", notesControllers.getNotesList);

router.post("/:noteId", notesControllers.addEditNotes);

router.delete("/:noteId",notesControllers.deleteNote)

module.exports = router;
