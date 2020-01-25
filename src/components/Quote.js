import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    class: "",
    like: false,
    dislike: false
  };

  handleLike = () => {
    console.log("handleLike has been pressed");
    this.props.increaseLikes(this.props.id);
    this.setState({
      class: "liked",
      like: true,
      dislike: false
    });
  };

  handleDislike = () => {
    console.log("handleDislike has been pressed");
    this.props.increaseDislikes(this.props.id);
    this.setState({
      class: "disliked",
      like: false,
      dislike: true
    });
  };

  render() {
    return (
      <div className={this.state.class}>
        <h3>id test:{this.props.id}</h3>
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
