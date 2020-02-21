const yahooFinance = require("yahoo-finance");

const getPrice = async ticker => {
  const priceInfo = await yahooFinance.quote({
    symbol: ticker,
    modules: ["price"]
  });

  if (!priceInfo || !priceInfo.price) {
    console.log(`No price info found for ${ticker}`);
    return -1;
  } else {
    return priceInfo.price.regularMarketPrice;
  }
};

const getPrices = async tickers => {
  if (!tickers || !tickers.length) {
    console.log("Nothing to query");
    return {};
  }

  let prices = {};
  for (var i = 0; i < tickers.length; i++) {
    const ticker = tickers[i];
    const price = await getPrice(ticker);
    console.log(`Price for ${ticker} is ${price}`);
    prices[ticker] = price;
  }

  return prices;
};

module.exports = {
  getPrices
};
