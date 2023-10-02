const winston = require("winston");

const mongoose = require("mongoose");

module.exports = function connectMangoose() {
  mongoose.connect("mongodb://127.0.0.1/vidly").then(() => {
    winston.info("database connected");
  });
};
