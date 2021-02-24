const express = require("express");
const router = express.Router();

// Loading Models
const Request = require("../../models/Request");
const User = require("../../models/User");
const Company = require("../../models/Company");

// @route   Post api/request/create
// @desc    Create a new request
// @access  Public
router.post("/create", async (req, res) => {
  // Destruturing body
  const {
    type,
    description,
    image,
    status,
    created_req_time,
    companyId,
    userId,
    history,
  } = req.body;

  const newRequest = new Request({
    type,
    description,
    image,
    status,
    created_req_time,
    companyId,
    userId,
    history,
  });

  await newRequest.save();
  res.send(newRequest);
});

// @route   Get api/request/:company_id
// @desc    Show all requests by company
// @access  Public
//TODO

// @route   Update api/request/:company_id
// @desc    Update request
// @access  Public
//TODO

module.exports = router;
