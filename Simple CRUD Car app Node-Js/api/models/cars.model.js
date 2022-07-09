const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");

class CarModel {
  //@GET
  getAllCars() {
    return new Promise((resolve, rejects) => {
      const text = textService.readDataFromDb("db.json");
      if (!text) {
        rejects({
          message: "No data found!",
        });
      }
      resolve(JSON.parse(text));
    });
  }

  getCarById(carId) {
    return new Promise((resolve, rejects) => {
      const text = textService.readDataFromDb("db.json");
      const data = JSON.parse(text);
      const car = data.filter((car) => car.id === carId)[0];

      if (car) {
        resolve(car);
      } else {
        rejects({
          message: "Error! No such item found!",
        });
      }
    });
  }

  addNewCarModel(car) {
    return new Promise((resolve, rejects) => {
      car.id = uuidv4();
      car.isRented = false;
      const text = textService.readDataFromDb("db.json");
      const data = JSON.parse(text);
      data.push(car);
      const dataStringifed = JSON.stringify(data);
      textService.writeDataToDb("db.json", dataStringifed);
      resolve({
        message: "Car was sucessfully added!",
      });
    });
  }

  deleteCarModel(carId) {
    return new Promise((resolve, rejects) => {
      const text = textService.readDataFromDb("db.json");
      const data = JSON.parse(text);
      const filteredData = data.filter((car) => car.id !== carId);
      const dataStringifed = JSON.stringify(filteredData);
      textService.writeDataToDb("db.json", dataStringifed);
      resolve({
        message: `Car with id ${carId} successfully deleted!`,
      });
    });
  }

  updateCarModel(id, body) {
    return new Promise((resolve, rejects) => {
      const text = textService.readDataFromDb("db.json");
      const data = JSON.parse(text);

      data.forEach((car) => {
        if (car.id === id) {
          car.brand = body.brand;
          car.model = body.model;
          car.year = body.year;
          car.price = body.price;
        }
      });

      const dataStringifed = JSON.stringify(data);
      textService.writeDataToDb("db.json", dataStringifed);

      resolve({
        message: `Car with id ${id} was updated!`,
      });
    });
  }
}

module.exports = CarModel;
