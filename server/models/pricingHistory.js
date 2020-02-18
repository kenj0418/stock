const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pricingHistory = new Schema({
  securityId: String,
  date: String,
  pricePerShare: Number
});

module.exports = mongoose.model("PricingHistory", pricingHistory);
