const { login, logout, refresh } = require("../controllers/authController");
const loginLimiter = require("../middleware/loginlimiter");
const router = require("express").Router();


router.route("/").post(loginLimiter,login);
router.route("/logout").post(logout);
router.route("/refresh").get(refresh);
module.exports = router;