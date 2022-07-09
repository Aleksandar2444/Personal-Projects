const { sign, verify } = require("jsonwebtoken");

const createAccessToken = (userID) => {
  return sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

const createRefreshToken = (userID) => {
  return sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "14d",
  });
};

const verifyAccessToken = (token) => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (refreshToken) => {
  return verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
