import React, { Component } from "react";
import { graphql } from "react-apollo";
import PieChart from "react-minimal-pie-chart";
import { getHoldingsQuery } from "../queries/queries";

const colors = [
  "#FFEC21",
  "#378AFF",
  "#FFA32F",
  "#F54F52",
  "#93F03B",
  "#9552EA"
]; // https://www.schemecolor.com/colorful-pie-chart.php

class PortfolioPieChart extends Component {
  displayHoldings(data) {
    if (data && data.error) {
      return <li>Error: {data.error}</li>;
    } else if (!data || data.loading || !data.holdings) {
      return <li>Loading...</li>;
    }

    const slices = data.holdings.map((holding, index) => ({
      title: holding.security.ticker,
      value: holding.currentValue,
      color: colors[index % colors.length]
    }));

    return (
      <PieChart
        data={slices}
        label={labelProp => {
          console.log(labelProp);
          return labelProp.data[labelProp.dataIndex].title;
        }}
        labelStyle={{
          fontSize: "3px",
          fontFamily: "sans-serif",
          fill: "#121212"
        }}
        labelPosition="105"
        radius="30"
        cy="30"
      />
    );
  }

  render() {
    return <div>{this.displayHoldings(this.props.data)}</div>;
  }
}

export default graphql(getHoldingsQuery)(PortfolioPieChart);
