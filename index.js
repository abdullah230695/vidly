const express = require("express");
const winston = require("winston");
const app = express();

require("./startup/logger")();
require("./startup/database")();
require("./startup/apiRoutes")(app);
require("./startup/config")();

const port = process.env.PORT || 3000;

 winston.info("Running Environment : ", process.env.NODE_ENV);

app.listen(port, () => {
  winston.info(`Server started on port ${port}`);
});
