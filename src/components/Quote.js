import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    class: ""
  };

  handleLike = () => {
    console.log("handleLike has been pressed");
    this.props.increaseLikes(this.props.id);
    this.setState({
      class: "liked"
    });
  };

  handleDislike = () => {
    console.log("handleDislike has been pressed");
    this.props.increaseDislikes(this.props.id);
    this.setState({
      class: "disliked"
    });
  };

  render() {
    return (
      <div className={this.state.class}>
        <p>"{this.props.text}"</p>
        <p>By: {this.props.author}</p>
        <button onClick={this.handleLike} className="likebuttons">
          <i className="far fa-thumbs-up"></i>
        </button>
        <button onClick={this.handleDislike} className="likebuttons">
          <i className="far fa-thumbs-down"></i>
        </button>
      </div>
    );
  }
}
