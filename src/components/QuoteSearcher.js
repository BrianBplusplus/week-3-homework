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
          fetching: false
        });
      })
      .catch(err => {
        console.warn("error", err);
      });
  }

  render() {
    const quotes_copy = this.state.quotes;
    console.log("copy of quotes: ", quotes_copy);
    return (
      <div className="quotecollection">
        <h1>Quotes</h1>

        {this.state.fetching && "Loading..."}

        {quotes_copy.map((currentquote, index) => {
          return (
            <Quote
              key={index}
              text={currentquote.quoteText}
              author={currentquote.quoteAuthor}
            />
          );
        })}
      </div>
    );
  }
}
