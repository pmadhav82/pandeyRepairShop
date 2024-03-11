const router = require("express").Router()
const verifyJWT = require("../middleware/verifyJWT");
const notesController = require("../controllers/notesController");
const requiredRole = require("../middleware/requiredRole");

router.use(verifyJWT)

router.route("/")
.get(notesController.getAllNotes)
.post(notesController.createNewNote)
.delete(requiredRole(["Admin", "Manager"]), notesController.deleteNote)
.put( requiredRole(["Manager", "Admin"]),notesController.updateNote)


module.exports = router