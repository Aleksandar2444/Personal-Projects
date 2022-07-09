const TrainerService = require("../services/trainer.service");

class TrainerController {
  //1. Get all trainers
  static async getAllTrainers(req, res) {
    try {
      const trainer = await TrainerService.getAllTrainers();
      res.status(200).send(trainer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //2. Get trainer by id
  static async getTrainerById(req, res) {
    try {
      const trainerId = req.params.id;
      const trainer = await TrainerService.getTrainerById(trainerId);

      if (!trainer)
        return res
          .status(404)
          .send({ message: `Trainer with id: ${trainerId} not found` });

      res.status(200).send(trainer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //3. Create a trainer
  static async createTrainer(req, res) {
    try {
      const trainerData = req.body;
      const trainer = await TrainerService.createTrainer(trainerData);
      res.status(201).send(trainer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //4. Update trainer
  static async updateTrainer(req, res) {
    try {
      const trainerId = req.params.id;
      const updates = req.body;

      const updatedTrainer = await TrainerService.updateTrainer(
        trainerId,
        updates
      );
      res.status(200).send(updatedTrainer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //5. Delete trainer
  static async deleteTrainer(req, res) {
    try {
      const trainerId = req.params.id;
      const response = await TrainerService.deleteTrainer(trainerId);

      if (!response)
        return res
          .status(404)
          .send({ message: `Trainer with id: ${trainerId} not found!` });

      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = TrainerController;
