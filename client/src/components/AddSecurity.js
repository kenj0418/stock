import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { addSecurityMutation, getSecuritiesQuery } from "../queries/queries";

class AddSecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      name: "",
      assetClass: ""
    };
  }

  //todo change to lookup up name from yahoo-finance via another function

  submitForm(e) {
    e.preventDefault();
    this.props.addSecurityMutation({
      variables: {
        ticker: this.state.ticker,
        name: this.state.name,
        assetClass: this.state.assetClass
      },
      refetchQueries: [{ query: getSecuritiesQuery }]
    });
  }

  render() {
    return (
      <form id="add-security" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Ticker:</label>
          <input
            type="text"
            onChange={e => this.setState({ ticker: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Asset Class:</label>
          <input
            type="text"
            onChange={e => this.setState({ assetClass: e.target.value })}
          />
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(addSecurityMutation, { name: "addSecurityMutation" })
)(AddSecurity);
