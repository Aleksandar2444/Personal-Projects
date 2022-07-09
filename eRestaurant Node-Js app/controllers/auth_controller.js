const AuthModel = require("../models/auth_model");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../const/jwt.const");

class AuthController {
  //POST
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      const registeredUser = await AuthModel.createUser(userData);
      res.status(201).send(registeredUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //POST
  static async loginUser(req, res) {
    try {
      const credentials = req.body;
      const user = await AuthModel.loginUser(credentials);

      const token = createAccessToken(user.id);
      const refreshToken = createRefreshToken(user.id);

      await AuthModel.saveRefreshToken(user.id, refreshToken);

      res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/refesh-token",
      });

      res.status(200).send({ user, token, refreshToken });
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //POST
  static async logoutUser(req, res) {
    try {
      const userID = req.params.id;
      await AuthModel.deleteRefreshToken(userID);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //POST
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      // console.log(refreshToken);
      if (!refreshToken) return res.sendStatus(403);
      // console.log(!refreshToken);
      const { userID } = verifyRefreshToken(refreshToken);
      const userFound = await AuthModel.getUserByID(userID);
      if (!userFound) return res.sendStatus(403);
      if (refreshToken !== userFound.refreshToken) return res.sendStatus(403);

      const token = createAccessToken(userFound.id);
      res.status(200).send({ token });
    } catch (error) {
      res.status(403).send(error);
    }
  }
}

module.exports = AuthController;
