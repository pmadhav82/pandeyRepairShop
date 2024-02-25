const router = require("express").Router()
const verifyJWT = require("../middleware/verifyJWT");
const notesController = require("../controllers/notesController");


router.use(verifyJWT)
router.route("/")
.get(notesController.getAllNotes)
.post(notesController.createNewNote)
.delete(notesController.deleteNote)
.put(notesController.updateNote)
module.exports = router