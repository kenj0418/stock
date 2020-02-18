import { gql } from "apollo-boost";

const getHoldingsQuery = gql`
  {
    holdings {
      id
      security {
        ticker
        name
        assetClass
        latestPrice {
          date
          pricePerShare
        }
      }
      shares
      currentValue
    }
  }
`;

const getHoldingQuery = gql`
  query($id: ID) {
    holding(id: $id) {
      id
      security {
        ticker
        name
        assetClass
        latestPrice {
          date
          pricePerShare
        }
      }
      shares
      currentValue
    }
  }
`;

const getSecuritiesQuery = gql`
  {
    securities {
      id
      ticker
      name
      assetClass
    }
  }
`;

const addHoldingMutation = gql`
  mutation($securityId: ID!, $shares: Float!) {
    addHolding(securityId: $securityId, shares: $shares) {
      id
    }
  }
`;

const addSecurityMutation = gql`
  mutation($ticker: String!, $name: String!, $assetClass: String!) {
    addSecurity(ticker: $ticker, name: $name, assetClass: $assetClass) {
      id
    }
  }
`;

export {
  getHoldingQuery,
  getHoldingsQuery,
  getSecuritiesQuery,
  addHoldingMutation,
  addSecurityMutation
};
