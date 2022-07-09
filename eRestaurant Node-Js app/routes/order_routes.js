const router = require("express").Router();
const OrderController = require("../controllers/order_controller");
const tokenValidator = require("../middlewares/token_validator.middleware");

router.get("/all", tokenValidator, OrderController.fetchAllOrders);
router.get("/:id", tokenValidator, OrderController.fetchOrderByID);
router.post("/add", tokenValidator, OrderController.createNewOrder);
router.patch("/:id/status", tokenValidator, OrderController.updateOrder);
router.delete("/:id", tokenValidator, OrderController.deleteOrder);

module.exports = router;
