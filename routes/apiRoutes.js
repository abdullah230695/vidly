const express = require("express");
const apiRouter = express();
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");

apiRouter.use("/genres", genres);
apiRouter.use("/customers", customers);
apiRouter.use("/movies", movies);
apiRouter.use("/rentals", rentals);
apiRouter.use("/users", users);
apiRouter.use("/auth", auth);

module.exports = apiRouter;
