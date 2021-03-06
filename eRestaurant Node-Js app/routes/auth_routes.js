const router = require("express").Router();
const AuthController = require("../controllers/auth_controller");
const userValidator = require("../middlewares/user_validator.middleware");

router.post("/register", userValidator, AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/:id/logout", AuthController.logoutUser);
router.post("/refresh-token", AuthController.refreshAccessToken);

module.exports = router;
