'use strict';

const debug = require('util').debuglog('path-converter');

module.exports = async (controller, option) => {

  controller.hears('\\\\(.+)', ['ambient'], async (bot, msg) => {
    bot.reply(msg, `Convert for :mac:: smb:/${msg.match[1].replace(/\\/g, '/')}`);
  });

  controller.hears('smb:\/\/([^>]+)', ['ambient'], async (bot, msg) => {
    bot.reply(msg, `Convert for :windows:: \`\\\\${msg.match[1].replace(/\//g, '\\')}\``);
  });

};
