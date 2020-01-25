import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: true
  };

  componentDidMount() {
    const query = "tree";
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${query}`)
      .then(response => response.json())
      .then(apiQuotes => {
        console.log("fetched object: ", apiQuotes.results);
        const fetchedQuotes = apiQuotes.results.map(apiQuote => {
          return { ...apiQuote };
        });

        console.log("const fetchedQuotes = : ", fetchedQuotes);
        this.setState({
          quotes: fetchedQuotes,
          fetching: false,
          likes: 0,
          dislikes: 0
        });
      })
      .catch(err => {
        console.warn("error", err);
      });
  }

  increaseLikes = id => {
    const likeData = this.state.quotes.map(quote => {
      if (quote._id === id) {
        console.log("id check == quote._id", quote._id, "id check == id", id);
        return; //quote;
        //return (this.state.likes = this.state.likes + 1);
      } else {
        console.log("------ Else has been triggered --------");
        return; //quote;
      }
    });
    this.setState({
      likes: likeData
    });
  };

  render() {
    const quotes_copy = this.state.quotes;
    console.log("copy of quotes: ", quotes_copy);
    return (
      <div className="quotecollection">
        <h1>Quotes</h1>
        <h2>
          Likes: {this.state.likes} Dislikes: {this.state.dislikes}
        </h2>

        {this.state.fetching && "Loading..."}

        {quotes_copy.map((currentquote, index) => {
          return (
            <Quote
              key={index}
              id={currentquote._id}
              text={currentquote.quoteText}
              author={currentquote.quoteAuthor}
              increaseLikes={this.increaseLikes}
            />
          );
        })}
      </div>
    );
  }
}
