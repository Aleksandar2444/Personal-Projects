const router = require("express").Router();
const DishController = require("../controllers/dish.controller");

router.get("/", DishController.getAllDishes);
router.get("/:id", DishController.getDishById);
router.post("/", DishController.createDish);
router.patch("/:id", DishController.updateDish);
router.delete("/:id", DishController.deleteDish);

module.exports = router;
