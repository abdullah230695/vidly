const database = require("./database/database");
const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRoutes");

app.use(express.json());

console.log("env : ", process.env.NODE_ENV);

database.connectMangoose();

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
