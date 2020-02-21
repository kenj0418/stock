import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getSecuritiesQuery,
  addHoldingMutation,
  getHoldingsQuery
} from "../queries/queries";

class AddHolding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securityId: "",
      shares: 0
    };
  }

  displaySecurities() {
    var data = this.props.getSecuritiesQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else if (data.securities) {
      return data.securities.map(security => {
        return (
          <option key={security.id} value={security.id}>
            {security.name} ({security.ticker})
          </option>
        );
      });
    } else {
      return <option>No securities found</option>;
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addHoldingMutation({
      variables: {
        securityId: this.state.securityId,
        shares: this.state.shares
      },
      refetchQueries: [{ query: getHoldingsQuery }]
    });
  }

  render() {
    return (
      <form id="add-holding" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Security:</label>
          <select onChange={e => this.setState({ securityId: e.target.value })}>
            <option>Select security</option>
            {this.displaySecurities()}
          </select>
        </div>
        <div className="field">
          <label>Shares:</label>
          <input
            type="text"
            onChange={e =>
              this.setState({ shares: parseFloat(e.target.value) })
            }
          />
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getSecuritiesQuery, { name: "getSecuritiesQuery" }),
  graphql(addHoldingMutation, { name: "addHoldingMutation" })
)(AddHolding);
