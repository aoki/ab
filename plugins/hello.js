'use strict';

module.exports = controller => {
  controller.hears('hello', ['direct_message', 'direct_mention', 'mention'], (bot, msg) => {
    bot.reply(msg, 'hello :wave:');
  });
};
