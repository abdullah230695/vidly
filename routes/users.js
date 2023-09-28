const lodash = require("lodash");
const { Users, validate } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Users.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let user = Users.where({ email: req.body.email });

  // console.log("users : ", user);
  // if (user) return res.status(400).send("email already registered");

  let users = new Users(lodash.pick(req.body, ["name", "email", "password"]));
  await users.save();

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
