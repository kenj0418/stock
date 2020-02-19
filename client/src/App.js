import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Portfolio from "./components/Portfolio";
import PortfolioPieChart from "./components/PortfolioPieChart";
import AddSecurity from "./components/AddSecurity";
import AddHolding from "./components/AddHolding";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:7071/graphql"
});
// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Portfolio</h1>
        <Portfolio />
        <PortfolioPieChart />
        <AddSecurity />
        <AddHolding />
      </div>
    </ApolloProvider>
  );
}

export default App;
