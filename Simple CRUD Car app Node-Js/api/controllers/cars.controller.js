const CarsModel = require("../models/cars.model");
const carsModel = new CarsModel();

class CarController {
  fetchAllCars() {
    return carsModel.getAllCars();
  }

  fetchAllCarsById(carId) {
    return carsModel.getCarById(carId);
  }

  fetchAddedCar(car) {
    return carsModel.addNewCarModel(car);
  }

  fetchDeletedCar(carId) {
    return carsModel.deleteCarModel(carId);
  }

  fetchUpdatedCar(id, body) {
    return carsModel.updateCarModel(id, body);
  }
}

module.exports = CarController;
