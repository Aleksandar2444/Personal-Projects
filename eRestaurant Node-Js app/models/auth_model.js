const DataService = require("../services/data_service");
const path = require("path");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "db_users.json");

class User {
  constructor(firstName, lastName, age, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

class AuthModel {
  //GET
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }
  //GET
  static async getUserByID(userID) {
    const users = await this.getAllUsers();
    const foundUser = users.find((user) => user.id === userID);
    return foundUser;
  }
  //POST
  static async createUser(userData) {
    const users = await this.getAllUsers();
    const checkUserExists = users.some((user) => user.email === userData.email);
    if (checkUserExists)
      return Promise.reject({ message: "Email already taken" });

    const hashedUserPassword = await bcrypt.hash(userData.password, 8);

    const newUser = new User(
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      hashedUserPassword
    );

    const updatedUser = [...users, newUser];
    await DataService.saveJSONFile(usersPath, updatedUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
  //POST
  static async loginUser(credentials) {
    const { email, password } = credentials;
    const users = await this.getAllUsers();

    const userFound = users.find((user) => user.email === email);
    if (!userFound) return Promise.reject({ message: "Invaild Credentials" });

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid)
      return Promise.reject({ message: "Invalid Credentials" });

    const { password: hashedUserPassword, ...userWithoutPassword } = userFound;
    return userWithoutPassword;
  }
  //POST
  static async saveRefreshToken(userID, refreshToken) {
    const users = await this.getAllUsers();
    const updatedUsers = users.map((user) => {
      if (user.id === userID) {
        user.refreshToken = refreshToken;
        return user;
      }
      return user;
    });
    await DataService.saveJSONFile(usersPath, updatedUsers);
  }
  //
  static async deleteRefreshToken(userID) {
    const users = await this.getAllUsers();
    const updatedUsers = users.map((user) => {
      if (user.id === userID) {
        user.refreshToken = null;
        return user;
      }
      return user;
    });
    await DataService.saveJSONFile(usersPath, updatedUsers);
  }
}

module.exports = AuthModel;
