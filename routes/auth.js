const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Users } = require("../models/users");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Users.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Users.findOne({ email: req.body.email });

  console.log("users : ", user);
  if (!user) return res.status(400).send("Incorrect username or password");

  const isMatched = await bcrypt.compare(req.body.password, user.password);

  if (!isMatched) return res.status(400).send("Incorrect username or password");

  res.send(user.id);
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

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
