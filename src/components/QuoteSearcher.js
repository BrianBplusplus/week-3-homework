import React, { Component } from "react";
import Quote from "./Quote";
import Searcher from "./Searcher";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    fetching: false,
    likes: 0,
    dislikes: 0
  };

  search = input => {
    console.log("Search got triggered");
    console.log(input);

    this.setState({
      fetching: true,
      quotes: [],
      likes: 0,
      dislikes: 0
    });

    const userSearch = input;
    const api = `https://quote-garden.herokuapp.com/quotes/search/${userSearch}`;

    fetch(api)
      .then(response => response.json())
      .then(apiQuotes => {
        console.log("fetched object: ", apiQuotes.results);
        const fetchedQuotes = apiQuotes.results.map(apiQuote => {
          return { ...apiQuote };
        });

        console.log("const fetchedQuotes = : ", fetchedQuotes);
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
        console.log("LIKE ---IF---");
        this.state.likes = this.state.likes + 1;
        return { ...quote, likes: true, dislikes: false };
      } else if (
        quote._id === id &&
        quote.likes !== true &&
        quote.dislikes === true
      ) {
        console.log("LIKE -----ELSE IF------");
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
        console.log("DISLIKE ---IF---");
        this.state.dislikes = this.state.dislikes + 1;
        return { ...quote, likes: false, dislikes: true };
      } else if (
        quote._id === id &&
        quote.dislikes !== true &&
        quote.likes === true
      ) {
        console.log("DISLIKE -----ELSE IF------");
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
    console.log("copy of quotes: ", quotes_copy);
    return (
      <div className="quotecollection">
        <h1>Quotes</h1>
        <Searcher event={12} search={this.search} />
        <h2>
          Likes: {this.state.likes} / Dislikes: {this.state.dislikes}
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
              increaseDislikes={this.increaseDislikes}
            />
          );
        })}
      </div>
    );
  }
}
