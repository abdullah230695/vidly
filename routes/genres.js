const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/create", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", adminMiddleware, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  if (!checkIdIsValid(req.params.id)) return res.status(404).send("Invalid ID");
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

function checkIdIsValid(id) {
  let isValid = mongoose.Types.ObjectId.isValid(id);
  return isValid;
}

module.exports = router;
