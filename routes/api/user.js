const express = require("express");
const router = express.Router();

// Loading Models
const User = require("../../models/User");

// @route   Post api/user/create
// @desc    Add a new user
// @access  Public
router.post("/create", async (req, res) => {
  const { name, email, companyId } = req.body;
  const newUser = new User({
    name,
    email,
    companyId,
  });

  await newUser.save();
  res.status(201).send(newUser);
});

// @route   GET api/user/all
// @desc    Show complete list of users (Testing Purpose)
// @access  Public
router.get("/all", async (req, res) => {
  const users_list = await User.find().populate("companyId");
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
  const user = await User.find({ email }).populate("companyId");
  if (!user) {
    res.status(404).send({ err: "User not Found!" });
  }
  res.send(user);
});

// @route   POST api/user/update
// @desc    Update user
// @access  Publi
router.put("/update/:id", async (req, res) => {
  const _id = req.params.id;
  const { name, companyId } = req.body;

  const user = await User.findByIdAndUpdate({ _id }, { name, companyId });

  if (!user) {
    res.status(404).send({ err: "User not found!" });
  }

  res.send(user);
});

// @route   GET api/user/company/:id
// @desc    Get all the users under same company
// @access  Public
router.get("/company/:id", async (req, res) => {
  const companyId = req.params.id;
  const user = await User.find({ companyId }).populate("companyId");

  if (!user) {
    res.status(404).send({ err: "No User found" });
  }

  res.status(201).send(user);
});

// @route   DELETE api/user/delete
// @desc    Delete user
// @access  Public
router.delete("/delete", async (req, res) => {
  User.collection.drop();
  res.json({ msg: "User dropped!" });
});

module.exports = router;
