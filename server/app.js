const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();
app.use(cors());

const connectionString =
  "mongodb://ken:test123@ds033767.mlab.com:33767/kjj-gql";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to database");
  });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
