const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const securitySchema = new Schema({
  ticker: String,
  name: String,
  assetClass: String
});

module.exports = mongoose.model("Security", securitySchema);
