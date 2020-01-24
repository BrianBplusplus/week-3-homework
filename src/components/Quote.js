import React, { Component } from "react";

export default class Quote extends Component {
  render() {
    return (
      <div>
        <p>"{this.props.text}"</p>
        <p>By: {this.props.author}</p>
        <button className="likebuttons">
          <i class="far fa-thumbs-up"></i>
        </button>
        <button className="likebuttons">
          <i class="far fa-thumbs-down"></i>
        </button>
      </div>
    );
  }
}
