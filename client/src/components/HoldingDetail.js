import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getHoldingQuery } from "../queries/queries";

class HoldingDetails extends Component {
  displayLatestPrice(latestPrice) {
    if (latestPrice) {
      return (
        <p>
          Latest Price: {latestPrice.pricePerShare} on {latestPrice.date}
        </p>
      );
    } else {
      return <p>No price available</p>;
    }
  }

  displayHoldingDetails() {
    const { holding } = this.props.data;
    if (holding) {
      return (
        <div id="security-details">
          <h2>
            {holding.shares} shares of {holding.security.ticker}
          </h2>
          <p>{holding.security.name}</p>
          <p>Asset Class: {holding.security.assetClass}</p>
          {this.displayLatestPrice(holding.security.latestPrice)}
          <p>Current Value: ${Math.round(holding.currentValue)} </p>
        </div>
      );
    } else {
      return (
        <div id="security-details">
          <p>No security selected</p>
        </div>
      );
    }
  }

  render() {
    return this.displayHoldingDetails();
  }
}

export default graphql(getHoldingQuery, {
  options: props => {
    return {
      variables: {
        id: props.holdingId
      }
    };
  }
})(HoldingDetails);
