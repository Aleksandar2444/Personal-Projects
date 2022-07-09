const { verifyAccessToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth_model");

const tokenValidator = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return res.sendStatus(403);

    const token = authorizationHeader.split(" ")[1];

    const { userID } = verifyAccessToken(token);

    const user = await AuthModel.getUserByID(userID);
    if (!user) return res.sendStatus(403);

    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

module.exports = tokenValidator;
