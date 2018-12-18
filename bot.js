/*
    Bot Controller
 */

const botkit = require('botkit');
const axios = require('axios');

const controller = botkit.consolebot({});
controller.spawn();

controller.on('message_received', function (bot, message) {
    const lower = message.text.toLowerCase();
    if (lower.includes('au revoir')) {
        bot.reply(message, 'A Bientôt!');
    } else if (lower.includes('bonjour')) {
        bot.reply(message, 'Bonjour !');
    } else if (lower) {
        axios.get('http://localhost:3000', {
            params: {
                sentence: message.text
            }
        })
            .then((response) => {
                bot.reply(message, response.data);
            })
            .catch(() => {
                bot.reply(message, 'Euh...');
            })
    } else {
        bot.reply(message, 'Mais encore ?');
    }
});
