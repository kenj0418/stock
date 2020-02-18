const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
require("dotenv").config();
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();
app.use(cors());

// const connectionString =
//   "mongodb://ken:test123@ds033767.mlab.com:33767/kjj-gql";
// mongoose
//   .connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("connected to database");
//   });

mongoose
  .connect(
    "mongodb://" +
      process.env.COSMOSDB_HOST +
      ":" +
      process.env.COSMOSDB_PORT +
      "/" +
      process.env.COSMOSDB_DBNAME +
      "?ssl=true&replicaSet=globaldb",
    {
      auth: {
        user: process.env.COSMODDB_USER,
        password: process.env.COSMOSDB_PASSWORD
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false
    }
  )
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch(err => console.error(err));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
