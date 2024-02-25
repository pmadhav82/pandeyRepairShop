const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT);
router.route("/")
.post(usersController.createNewUser)
.get(usersController.getAllUsers)
.put(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports = router;
