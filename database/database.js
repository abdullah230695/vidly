const mongoose = require("mongoose");

function connectMangoose() {
  mongoose
    .connect("mongodb://127.0.0.1/vidly")
    .then(() => {
      console.log("database connected");
      // debug("database connected");
    })
    .catch((err) => {
      console.log("database connection error : ", err);
      // debug("database connection error : ", err);
    });
}

module.exports = { connectMangoose };
