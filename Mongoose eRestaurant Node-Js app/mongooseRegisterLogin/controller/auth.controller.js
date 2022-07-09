const AuthService = require("../services/auth.service");

class AuthController {
  //1. Register user
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await AuthService.registerUser(userData);
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //2. Login user
  static async loginUser(req, res) {
    try {
      const credentials = req.body;
      const user = await AuthService.loginUser(credentials);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = AuthController;
