const express = require("express");
const router = express.Router();

// Loading Models
const Request = require("../../models/Request");
const User = require("../../models/User");
const Company = require("../../models/Company");
const { findOneAndUpdate, findByIdAndUpdate } = require("../../models/Company");

// @route   Post api/request/create
// @desc    Create a new request
// @access  Public
router.post("/create", async (req, res) => {
  // Destruturing body
  const { type, description, image, status, companyId, userId } = req.body;

  const newRequest = new Request({
    type,
    description,
    image,
    status,
    companyId,
    userId,
  });

  await newRequest.save();
  res.send(newRequest);
});

// @route   Get api/request/:companyId
// @desc    Show all requests by company
// @access  Public
router.get("/:companyId", async (req, res) => {
  const { companyId } = req.params;
  const requests = await Request.find({ companyId }).populate("companyId");
  if (!requests || requests === "[]") {
    res.status(404).send({ err: "No company Found" });
  }

  res.status(201).send(requests);
});

// @route   Update api/request/:userId
// @desc    Update request
// @access  Public
router.put("/:requestId", async (req, res) => {
  const _id = req.params.requestId;

  const newRequest = {
    type,
    description,
    image,
    status,
    companyId,
  };

  const updateRequest = await findByIdAndUpdate({ _id }, { newRequest });
  if (!updateRequest) {
    res.send({ err: "Unable to Update the Request" });
  }
  res.status(201).send(updateRequest);
});

module.exports = router;
