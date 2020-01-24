import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [
      {
        _id: "5d91b45d9980192a317c8acc",
        quoteText:
          "Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind.",
        quoteAuthor: "Bruce Lee"
      },
      {
        _id: "5d91b45d9980192a317c8abe",
        quoteText:
          "Give me six hours to chop down a tree and I will spend the first four sharpening the axe.",
        quoteAuthor: "Abraham Lincoln"
      },
      {
        _id: "5d91b45d9980192a317c8955",
        quoteText:
          "Good timber does not grow with ease; the stronger the wind, the stronger the trees.",
        quoteAuthor: "J. Willard Marriott"
      }
    ]
  };

  render() {
    const quotes_copy = this.state.quotes;
    console.log(quotes_copy);
    return (
      <div className="quotecollection">
        <h1>Quotes</h1>
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
