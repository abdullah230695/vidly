const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: { type: Boolean, required: true },
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin },
    process.env.jwtPrivateKey
  );
};

const Users = mongoose.model("Users", userSchema);

function validateUsers(users) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.boolean().required(),
  };

  return Joi.validate(users, schema);
}

exports.Users = Users;
exports.validate = validateUsers;
