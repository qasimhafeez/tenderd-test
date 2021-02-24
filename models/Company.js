const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    ref: "users",
    type: [Schema.Types.ObjectId],
  },
});

module.exports = Company = mongoose.model("company", CompanySchema);
