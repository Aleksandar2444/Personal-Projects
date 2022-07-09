const Trainer = require("../models/trainer.model");

class TrainerService {
  //1. Get all trainers
  static async getAllTrainers() {
    const trainers = await Trainer.find({});
    return trainers;
  }
  //2. Get trainer by id
  static async getTrainerById(trainerId) {
    const trainer = await Trainer.findById(trainerId);
    return trainer;
  }
  //3. Create a trainer
  static async createTrainer(trainerData) {
    const trainer = new Trainer(trainerData);
    await trainer.save();
    return trainer;
  }
  //4. Update trainer
  static async updateTrainer(trainerId, updateData) {
    const trainer = await Trainer.findById(trainerId);
    if (!trainer) return Promise.reject({ message: "Trainer not found" });

    const updateKeys = Object.keys(updateData);

    updateKeys.forEach((key) => {
      if (key !== "_id") {
        trainer[key] = updateData[key];
      }
    });

    const updatedTrainer = await trainer.save();
    return updatedTrainer;
  }
  //5. Delete trainer
  static async deleteTrainer(trainerId) {
    await Trainer.findByIdAndDelete(trainerId);
  }
}

module.exports = TrainerService;
