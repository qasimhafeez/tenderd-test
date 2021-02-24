const express = require("express");
const router = express.Router();

// Loading Models
const User = require("../../models/User");

// @route   Post api/user/create
// @desc    Add a new user
// @access  Public
router.post("/create", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({
    name,
    email,
  });

  await newUser.save();
  res.status(201).send(newUser);
});

// @route   GET api/user/all
// @desc    Show complete list of users (Testing Purpose)
// @access  Public
router.post("/all", async (req, res) => {
  const users_list = await User.find();
  if (!users_list) {
    res.status(404).send({ error: "No User Found!" });
  }

  res.status(201).send(users_list);
});

module.exports = router;
