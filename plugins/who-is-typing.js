'use strict';

const p = require('util').promisify;
const chalk = require('chalk');

module.exports = controller => {
  controller.on('user_typing', async (bot, msg) => {

    // @see https://api.slack.com/methods/conversations.info
    // C: channel, G: private group, D: Direct Msg
    const channel = (msg.channel.charAt(0) === 'D') ? 'DirectMessage' :
      (await p(bot.api.conversations.info)({channel: msg.channel})).channel.name;

    // @see https://api.slack.com/methods/users.info
    // C: channel, G: private group, D: Direct Msg
    const user = (msg.user.charAt(0) === 'B') ? 'BotUser' :
      (await p(bot.api.users.info)({user: msg.user})).user.name;

    console.log(`Typing ${chalk.green(user)}@${chalk.yellow(channel)}`);

  });
};
