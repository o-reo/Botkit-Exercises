/**
 * Quote API
 * Creates an API that returns a random quote on /quote
 * or returns every quotes matching a bag of words
 * Returns the list of available keywords on /quote/keywords
 */

const express = require('express');
const fs = require('fs');

const port = 3000;
const app = express();

const quotes = JSON.parse(fs.readFileSync('assets/quotes.json').toString());

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~ UTILS ~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * Returns every keyword found in quotes with no duplicates
 * @returns {Array}
 */
function getKeywords() {
    let keywords = [];
    quotes.forEach((el) => {
        keywords = keywords.concat(el['keywords']);
    });
    return keywords.filter((item, pos) => {return keywords.indexOf(item) === pos});
}

/**
 * Returns an array of quotes matching the keywords that are in a bag of words
 * @param {String} wordBag
 * @returns {Array}
 */
function quoteMatch(wordBag) {
  let matches = [];
  let intersect = [];
    quotes.forEach(quote => {
        intersect = quote['keywords'].filter(el => wordBag.indexOf(el.toLowerCase()) !== -1);
        if (intersect.length > 0)
            matches.push(quote);
    });
    return matches;
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~ ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/**
 * Creates a route that returns a random quote
 *  or a every quotes matching the bag of words sent as a query parameter
 */
app.get('/quote', (req, res) => {
  if (req.query['keyword']) {
    let matches = quoteMatch(req.query['keyword']);
    if (matches.length > 0) {
        // There is at least a match so it returns a random quote from matches
      res.status(200).send(matches);
    } else {
        // There is not match so it returns nothing
      res.status(204).end();
    }
  } else {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    res.status(200).send(quote);
  }
});

/**
 * Creates a route that returns the array of all keywords
 */
app.get('/quote/keywords', (req, res) => {
    res.send(getKeywords());
});

app.listen(port, () => {
  console.log('Server listening on port:', port);
});
