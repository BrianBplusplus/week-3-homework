import React, { Component } from "react";
import Quote from "./Quote";
import Searcher from "./Searcher";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    likes: 0,
    dislikes: 0,
    hassubmitted: false
  };

  search = input => {
    if (input.length === 0) {
      alert("Please input a keyword");
      return;
    }

    this.setState({
      fetching: true,
      quotes: [],
      likes: 0,
      dislikes: 0,
      hassubmitted: true
    });

    const userSearch = input;
    const api = `https://quote-garden.herokuapp.com/quotes/search/${userSearch}`;

    fetch(api)
      .then(response => response.json())
      .then(apiQuotes => {
        const fetchedQuotes = apiQuotes.results.map(apiQuote => {
          return { ...apiQuote };
        });

        this.setState({
          quotes: fetchedQuotes,
          fetching: false
        });
      })
      .catch(err => {
        console.warn("error", err);
      });
  };

  increaseLikes = id => {
    const likeData = this.state.quotes.map(quote => {
      if (quote._id === id && quote.likes !== true && quote.dislikes !== true) {
        this.state.likes = this.state.likes + 1;
        return { ...quote, likes: true, dislikes: false };
      } else if (
        quote._id === id &&
        quote.likes !== true &&
        quote.dislikes === true
      ) {
        this.state.likes = this.state.likes + 1;
        this.state.dislikes = this.state.dislikes - 1;
        return { ...quote, likes: true, dislikes: false };
      } else {
        return quote;
      }
    });

    this.setState({
      quotes: likeData
    });
  };

  increaseDislikes = id => {
    const likeData = this.state.quotes.map(quote => {
      if (quote._id === id && quote.dislikes !== true && quote.likes !== true) {
        this.state.dislikes = this.state.dislikes + 1;
        return { ...quote, likes: false, dislikes: true };
      } else if (
        quote._id === id &&
        quote.dislikes !== true &&
        quote.likes === true
      ) {
        this.state.dislikes = this.state.dislikes + 1;
        this.state.likes = this.state.likes - 1;
        return { ...quote, likes: false, dislikes: true };
      } else {
        return quote;
      }
    });

    this.setState({
      quotes: likeData
    });
  };

  render() {
    const quotes_copy = this.state.quotes;
    const errorMessage = quotes_copy.length === 0 ? true : false;
    return (
      <div className="quotecollection">
        <h1>Quotes</h1>
        <Searcher search={this.search} />
        <h2>
          Likes: {this.state.likes} / Dislikes: {this.state.dislikes}
        </h2>

        {this.state.fetching && "Loading..."}

        {errorMessage === true &&
          !this.state.fetching &&
          this.state.hassubmitted === true && (
            <p>...Could not find any quotes :(</p>
          )}

        {quotes_copy.map((currentquote, index) => {
          return (
            <Quote
              key={index}
              id={currentquote._id}
              text={currentquote.quoteText}
              author={currentquote.quoteAuthor}
              increaseLikes={this.increaseLikes}
              increaseDislikes={this.increaseDislikes}
            />
          );
        })}
      </div>
    );
  }
}
