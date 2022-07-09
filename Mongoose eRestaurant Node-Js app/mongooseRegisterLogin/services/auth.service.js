const User = require("../models/user.model");

class AuthService {
  //1. Register user
  static async registerUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }
  //2. Login user
  static async loginUser(credentials) {
    const { email, password } = credentials;
    //checking if email exists
    const user = await User.findOne({ email: email });
    if (!user) return Promise.reject({ message: "Invalid credentials" });
    //checking if password exists
    const isPasswordValid = await user.comparePasswords(password);
    if (!isPasswordValid)
      return Promise.reject({ message: "Invalid credentials" });
    return user;
  }
}

module.exports = AuthService;
