const router = require("express").Router();
const TrainerController = require("../controllers/trainer.controller");

router.get("/", TrainerController.getAllTrainers);
router.get("/:id", TrainerController.getTrainerById);
router.post("/", TrainerController.createTrainer);
router.patch("/:id", TrainerController.updateTrainer);
router.delete("/:id", TrainerController.deleteTrainer);

module.exports = router;
