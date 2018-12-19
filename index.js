/**
 * Quote API
 */

const express = require('express');
const fs = require('fs');

const port = 3000;
const app = express();

const quotes = JSON.parse(fs.readFileSync('assets/quotes.json').toString());

/**
 * Returns the quotes matching the keyword specified
 * @param {String} keyword
 * @returns {Array}
 */
function quoteMatch(keyword) {
  let matches = [];
  let lower = keyword.toLowerCase();
  quotes.forEach((quote) => {
      // Goes through the keywords to get if there is a match
    for (let kw of quote['keywords']) {
      if (lower === kw.toLowerCase()) {
        matches.push(quote['quote']);
        break;
      }
    }
  });
  return matches;
}

/**
 * Creates a route that returns a random quote or a random quote matching the specified keyword
 * returns the quote matching the sentence passed as a query parameter
 */
app.get('/quote', (req, res) => {
  if (req.query['keyword']) {
    let matches = quoteMatch(req.query['keyword']);
    if (matches.length > 0) {
        // There is at least a match so it returns a random quote from matches
      res.status(200).send(matches[Math.floor(Math.random() * matches.length)]);
    } else {
        // There is not match so it returns nothing
      res.status(204).end();
    }
  } else {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).send(quote['quote']);
  }
});

/**
 * Creates a route that returns the array of all keywords with no duplicates
 */
app.get('/quote/keywords', (req, res) => {
    let keywords = [];
    quotes.forEach((el) => {
        keywords = keywords.concat(el['keywords']);
    });
    keywords = keywords.filter((item, pos) => {return keywords.indexOf(item) === pos});
    res.send(keywords);
});

app.listen(port, () => {
  console.log('Server listening on port:', port);
});
