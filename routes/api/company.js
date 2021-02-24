const express = require("express");
const router = express.Router();

// Loading Models
const Company = require("../../models/Company");
const User = require("../../models/User");

// @route   POST api/company/add
// @desc    Add a new company
// @access  Public

router.post("/add", async (req, res) => {
  let err;
  const newCompany = new Company({
    name: req.body.company,
  });
  await newCompany.save();
  res.send(newCompany);
});

// @route   GET api/company/list
// @desc    complete list of companies
// @access  Public

router.get("/list", async (req, res) => {
  const err = "No Company is registered yet!";
  const companies_list = await Company.find();
  if (!companies_list) {
    res.send({ err });
  }
  res.status(200).send({ companies_list });
});

module.exports = router;
