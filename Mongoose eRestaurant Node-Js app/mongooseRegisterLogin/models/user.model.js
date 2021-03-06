const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 2,
    },
    age: {
      type: Number,
      required: true,
      min: 13,
    },
    email: {
      type: String,
      validate: {
        validator: (value) => validator.isEmail(value),
      },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      minlength: 2,
    },
  },
  { timestamps: true }
);

//Middleware go here
//Middleware for hashing password before save
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
    return next();
  }
  return next();
});

//Schema method for comparing passwords
userSchema.methods.comparePasswords = async function (credentialsPassword) {
  const isPasswordValid = await bcrypt.compare(
    credentialsPassword,
    this.password
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
