const { login } = require("../controllers/authController");

const router = require("express").Router();


router.route("/").get(login);

module.exports = router;