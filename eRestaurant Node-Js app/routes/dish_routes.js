const router = require("express").Router();
const DishesController = require("../controllers/dish_controller");
const tokenValidator = require("../middlewares/token_validator.middleware");

router.use(tokenValidator);

router.get("/all", DishesController.fetcAllDishes);
router.get("/:id", DishesController.fetchDishesByID);
router.post("/add", DishesController.createNewDish);
router.patch("/:id/update", DishesController.updateDishes);
router.delete("/:id", DishesController.deleteDishes);

module.exports = router;
