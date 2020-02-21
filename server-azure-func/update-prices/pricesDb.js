const Security = require("./models/security");
const PricingHistory = require("./models/pricingHistory");

const getAllSecurities = async () => {
  return Security.find();
};

const updatePrice = async (securityId, pricePerShare) => {
  const todaysDate = new Date().toJSON().slice(0, 10);

  let pricingHistory = new PricingHistory({
    securityId,
    date: todaysDate,
    pricePerShare
  });

  return pricingHistory.save();
};

const updatePrices = async (securities, prices) => {
  console.log(`Updating ${securities.length} securities`);
  for (var i = 0; i < securities.length; i++) {
    const ticker = securities[i].ticker;
    const securityId = securities[i].id;
    const price = prices[ticker];
    if (!price || price < 0) {
      console.log(`Invalid price for ${ticker}: ${price}`);
    } else {
      await updatePrice(securityId, price);
      console.log(`Updated price for ${ticker} to ${price}`);
    }
  }
};

module.exports = {
  getAllSecurities,
  updatePrices
};
