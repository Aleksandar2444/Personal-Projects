const router = require("express").Router();
const PlayerController = require("../controllers/players_controller");
const sessionValidatorMiddleWare = require("../middleware/session_validator");
const roleValidatorMiddleWare = require("../middleware/role_validator");

router.use(sessionValidatorMiddleWare);

router.get("/all", PlayerController.fetchAllPlayers);
router.get("/:id", PlayerController.fetchPlayerByID);
router.post("/add", PlayerController.createNewPlayer);
router.patch(
  "/:id/update",
  roleValidatorMiddleWare,
  PlayerController.updatePlayer
);
router.delete("/:id", roleValidatorMiddleWare, PlayerController.deletePlayer);

module.exports = router;
