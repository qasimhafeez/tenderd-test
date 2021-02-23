const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter a valid email address",
    ],
  },
  companyId: {
    ref: "company",
    type: Schema.Types.ObjectId,
  },
  requests: {
    ref: "requests",
    type: [Schema.Types.ObjectId],
  },
});

module.exports = User = mongoose.model("users", UserSchema);
