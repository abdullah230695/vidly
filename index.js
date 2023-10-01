require("express-async-errors");
const winston = require("winston");
//Setting the environment variables in nodejs
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const error = require("./middleware/error");
const database = require("./database/database");
const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRoutes");

winston.add(winston.transports.File, { filename: "logfile.log" });
app.use(express.json());

app.use("/api", apiRouter);

database.connectMangoose();

app.use(error);

const port = process.env.PORT || 3000;

const isDefined = process.env.jwtPrivateKey;

if (!isDefined) {
  console.error("FATAL ERROR : jwtPrivateKey");
  process.exit(1);
}

console.log("env : ", process.env.NODE_ENV);
console.log("isDefined : ", process.env.jwtPrivateKey);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
