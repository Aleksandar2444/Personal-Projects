const router = require("express").Router();
const CarsController = require("../controllers/cars.controller");
const textService = require("../textService");
const carsController = new CarsController();

// @GET all cars
router.get("/", (req, res) => {
  carsController
    .fetchAllCars()
    .then((car) => {
      res.status(200).json(car);
    })
    .catch((error) => {
      res.status(404).json(error);
    });

  const text = textService.readDataFromDb("db.json");
  const data = JSON.parse(text);

  if (req.query.pageSize) {
    dataCar = data.slice(0, parseInt(req.query.pageSize));
    res.status(200).json(dataCar);
  }

  if (req.query.brand) {
    brandCar = data.filter((car) => car.brand === req.query.brand);
    res.status(200).json(brandCar);
  }
});

router.get("/:id?", (req, res) => {
  if (req.params && req.params.id) {
    const carId = req.params.id;
    carsController
      .fetchAllCarsById(carId)
      .then((car) => {
        res.status(200).json(car);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  }
});

router.post("/addCar", (req, res) => {
  const car = req.body;
  carsController.fetchAddedCar(car).then((response) => {
    res.status(200).json(response);
  });
});

router.delete("/:id?", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      message: "Error! You didn't provided existing ID!",
    });
  } else {
    carsController.fetchDeletedCar(id).then((response) => {
      res.status(200).json(response);
    });
  }
});

router.put("/:id?", (req, res) => {
  const carId = req.params.id;
  const updatedCar = req.body;

  if (!carId || !updatedCar) {
    res.status(400).json({
      message: "Error! Wrong input, cannot update!",
    });
  } else {
    carsController.fetchUpdatedCar(carId, updatedCar).then((response) => {
      res.status(200).json(response);
    });
  }
});

module.exports = router;
