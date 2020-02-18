import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getHoldingsQuery } from "../queries/queries";
import HoldingDetail from "./HoldingDetail";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayHoldings(data) {
    if (data && data.error) {
      return <li>Error: {data.error}</li>;
    } else if (!data || data.loading || !data.holdings) {
      return <li>Loading...</li>;
    }

    return (
      <div>
        <ul id="portfolio">
          {data.holdings.map(holding => {
            return (
              <li
                key={holding.id}
                onClick={e => {
                  this.setState({ selected: holding.id });
                }}
              >
                ${Math.round(holding.currentValue)} - {holding.security.name}
                {" ("}
                {holding.security.ticker}
                {")"}
              </li>
            );
          })}
        </ul>
        <HoldingDetail holdingId={this.state.selected} />
      </div>
    );
  }

  render() {
    return <div>{this.displayHoldings(this.props.data)}</div>;
  }
}

export default graphql(getHoldingsQuery)(Portfolio);
