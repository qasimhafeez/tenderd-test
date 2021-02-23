const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
  created_req_time: {
    type: Date,
    default: Date.now(),
  },
  companyId: {
    ref: "company",
    type: Schema.Types.ObjectId,
  },
  userId: {
    ref: "users",
    type: [Schema.Types.ObjectId],
  },
  history: {
    type: Date,
  },
});

module.exports = User = mongoose.model("requests", RequestSchema);
