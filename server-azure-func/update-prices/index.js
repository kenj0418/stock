const mongoose = require("mongoose");
const dotenv = require("dotenv");
const finance = require("./finance");
const pricesDb = require("./pricesDb");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const connectString =
  "mongodb://" +
  process.env.COSMOSDB_HOST +
  ":" +
  process.env.COSMOSDB_PORT +
  "/" +
  process.env.COSMOSDB_DBNAME +
  "?ssl=true&replicaSet=globaldb";
console.log("Connect String: ", connectString);

mongoose
  .connect(connectString, {
    auth: {
      user: process.env.COSMODDB_USER,
      password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
  })
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch(err => console.error(err));

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const securities = await pricesDb.getAllSecurities();
  const tickers = securities.map(security => security.ticker);
  const prices = await finance.getPrices(tickers);
  await pricesDb.updatePrices(securities, prices);
  context.res = {
    body: "Prices updated"
  };
};
