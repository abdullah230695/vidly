const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

const initialPath = "/api";
module.exports = function (app) {
  app.use(express.json());

  app.use(initialPath + "/genres", genres);
  app.use(initialPath + "/customers", customers);
  app.use(initialPath + "/movies", movies);
  app.use(initialPath + "/rentals", rentals);
  app.use(initialPath + "/users", users);
  app.use(initialPath + "/auth", auth);

  //to log error message in winston we can use this middleware,
  // otherwise express - async - errors will throw its default error(Internal server error)
  app.use(error);
};
