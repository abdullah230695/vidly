const winston = require("winston");

const mongoose = require("mongoose");

module.exports = function connectMangoose() {
  const dbPath = process.env.dbPath;
  mongoose.connect(dbPath).then((v) => {
    winston.info(`database connected`);
  });
};
