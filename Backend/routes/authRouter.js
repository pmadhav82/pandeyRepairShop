const { login, logout, refresh } = require("../controllers/authController");

const router = require("express").Router();


router.route("/").post(login);
router.route("/logout").post(logout);
router.route("/refresh").get(refresh);
module.exports = router;