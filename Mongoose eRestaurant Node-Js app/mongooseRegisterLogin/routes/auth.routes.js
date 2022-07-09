const router = require("express").Router();
const AuthController = require("../controller/auth.controller");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
