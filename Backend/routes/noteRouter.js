const router = require("express").Router()

const notesController = require("../controllers/notesController")
router.route("/")
.get(notesController.getAllNotes)
.post(notesController.createNewNote)
.delete(notesController.deleteNote)
.patch(notesController.updateNote)
module.exports = router