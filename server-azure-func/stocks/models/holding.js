const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holdingSchema = new Schema({
  securityId: String,
  shares: Number
});

module.exports = mongoose.model("Holding", holdingSchema);
