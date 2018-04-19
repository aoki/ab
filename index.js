const Botkit = require('botkit');
const chalk = require('chalk');

const controller = Botkit.slackbot({
  debug: process.env.NODE_DEBUG || false
});

if (!process.env.AB_SLACK_API_TOKEN) {
  console.error(chalk.white.bgRed.bold('"AB_SLACK_API_TOKEN" is required'));
  process.exit(1);
}


controller.spawn({
  token: process.env.AB_SLACK_API_TOKEN
}).startRTM(function(err){
  if (err) {
    throw new Error(err);
  }
});


controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], (bot, msg) => {
  bot.reply(msg, 'hello :wave:');
});

