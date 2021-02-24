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
router.get("/all", async (req, res) => {
  const users_list = await User.find();
  if (!users_list) {
    res.status(404).send({ error: "No User Found!" });
  }

  res.status(201).send(users_list);
});

// @route   GET api/user/:email
// @desc    Get user from email
// @access  Public
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  const user = await User.find({ email });
  if (!user) {
    res.status(404).send({ err: "User not Found!" });
  }
  res.send(user);
});

// @route   POST api/user/update
// @desc    Update user with company name ID
// @access  Public
router.put("/update/:id", async (req, res) => {
  const _id = req.params.id;
  const { companyId } = req.body;
  const user = await User.findByIdAndUpdate({ _id }, { companyId });

  if (!user) {
    res.status(404).send({ err: "User not found!" });
  }

  res.send(user);
});

module.exports = router;
