const express = require('express');
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");
const requiredRole = require("../middleware/requiredRole");

 router.use(verifyJWT);
router.route("/")
.post(requiredRole(["Admin", "Manager"]),usersController.createNewUser)
.get(usersController.getAllUsers)
.put(requiredRole(["Manager", "Admin"]),usersController.updateUser)
.delete(requiredRole(["Admin", "Manager"]),usersController.deleteUser)
 
router.route("/currentUser").get(usersController.getCurrentUser);
module.exports = router;
