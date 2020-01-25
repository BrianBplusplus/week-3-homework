import React, { Component } from "react";

export default class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.search(this.state.value);
    // alert("A name was submitted: " + this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </label>
        <input type="submit" value="Search!" />
      </form>
    );
  }
}
