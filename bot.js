/**
 *  A Bot with console input that calls the API to return quotes matching
 *  specific keywords
 */
const botkit = require('botkit');
const axios = require('axios');

/**
 * Creates the bot using Botkit and opens the console input
 */
const controller = botkit.consolebot({
    debug: false
});
controller.spawn();


/**
 * Adds event handlers to handle received message and to reply accordingly
 */
controller.hears(['au revoir'], 'message_received', function (bot, message) {
    bot.reply(message, "A bientôt!");
    setTimeout(() => {
        process.exit();
    }, 1000);
});

controller.hears(['bonjour'], 'message_received', function (bot, message) {
    bot.reply(message, "Bonjour!");
});

/**
 * Gets keyword list and adds event handler to handle them after the request
 */
let keywords = [];

axios.get('http://localhost:3000/quote/keywords')
    .then(response => {
        keywords = response.data;
        controller.hears(keywords, 'message_received', function (bot, message) {

            // Normalizes text and removes punctuation
            let normMessage = message.text.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
            normMessage = normMessage.replace(/\s\s+/g, ' ').trim();
            if (normMessage) {

                // Converts to a bag of words
                const wordBag = normMessage.split(' ');

                // Request from the API
                axios.get('http://localhost:3000/quote', {
                    params: {
                        keyword: wordBag.toString()
                    }
                })
                    .then((response) => {
                        if (response.status === 200)

                        // A quote was found
                            response.data.forEach((quote) => {
                                bot.reply(message, quote['quote']);
                            });
                        else {

                            // No quote was found
                            bot.reply(message, 'Euh...');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        });

        // Default Message
        controller.hears('.*', 'message_received', function (bot, message) {
            bot.reply(message, 'Euh...');
        });
    })
    .catch(err => {
        console.log(err);
    });

