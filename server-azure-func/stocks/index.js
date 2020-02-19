const { ApolloServer, gql } = require("apollo-server-azure-functions");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
console.log(result.parsed);

const schema = require("./schema/schema");

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

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({ schema, graphiql: true });

exports.graphqlHandler = server.createHandler();

// const express = require("express");
// const graphqlHTTP = require("express-graphql");
// const cors = require("cors");
// const app = express();
// app.use(cors());
// app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

// const port = 4000;
// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
