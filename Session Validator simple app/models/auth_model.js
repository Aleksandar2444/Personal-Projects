const path = require("path");
const DataService = require("../services/data_services");

const userPath = path.join(__dirname, "..", "data", "dbUsers.json");

class AuthModel {
  static async loginUser(credentials) {
    const { email, password } = credentials;
    const user = await DataService.readJSONFile(userPath);
    const checkUser = user.find(
      (user) => user.email === email && user.password === password
    );
    if (!checkUser) return Promise.reject({ message: "Invalid Credentials" });
    return checkUser;
  }
}
module.exports = AuthModel;
