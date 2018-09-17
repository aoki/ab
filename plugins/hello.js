'use strict';

module.exports = (controller, option) => {
  const config = option.hello;
  const version = config.version;

  controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], (bot, msg) => {
    bot.reply(msg, `hello :wave: ${version}`);
  });
};
