//Setting the environment variables in nodejs
const dotenv = require("dotenv");
dotenv.config({ path: "./env/config.env" });

module.exports = function () {
  const isDefined = process.env.jwtPrivateKey;
  if (!isDefined) {
    throw Error("FATAL ERROR : jwtPrivateKey is not configured");
  }
};
