const bcrypt = require("bcrypt");
const lodash = require("lodash");
const { Users, validate } = require("../models/users");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const customers = await Users.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });

  console.log("users : ", user);
  if (user) return res.status(400).send("email already registered");

  let users = new Users(lodash.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(users.password, salt);
  await users.save();

  res.header("x-auth-token", users.generateToken());
  res.send(lodash.pick(users, ["name", "email"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const users = await Users.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  if (!users)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(users);
});

router.delete("/:id", async (req, res) => {
  const customer = await Users.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Users.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
