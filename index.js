/*
    Quote API
*/

const express = require('express');
const fs = require('fs');

const port = 3000;
const quotes = JSON.parse(fs.readFileSync('assets/quotes.json'));

const app = express();

function quote_match(sentence) {
    let matches = [];
    let lower = sentence.toLowerCase();
    quotes.forEach((quote) => {
        for (let kw of quote.keywords) {
            if (lower.includes(kw.toLowerCase())) {
                matches.push(quote.quote);
                break;
            }
        }
    });
    return matches;
}

app.get('/', (req, res) => {
    if (req.query.sentence) {
        let matches = quote_match(req.query.sentence);
        if (matches.length > 0) {
            res.status(200).send(matches[Math.floor(Math.random() * matches.length)]);
        } else {
            res.status(500).send('No quote was found');
        }
    } else {
        res.status(200).send(quotes[Math.floor(Math.random() * quotes.length)]['quote']);
    }
});

app.listen(port, () => {
    console.log('Server listening on port:', port);
});