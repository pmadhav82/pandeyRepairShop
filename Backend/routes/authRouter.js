const { login, logout, refresh} = require("../controllers/authController");
const loginLimiter = require("../middleware/loginlimiter");
const router = require("express").Router();


router.route("/").post(loginLimiter,login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;