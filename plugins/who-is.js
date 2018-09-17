'use strict';

const p = require('util').promisify;

module.exports = controller => {

  controller.hears('whois [@!]?(.+)', ['direct_message', 'direct_mention'], async (bot, msg) => {
    const name = msg.match[1];
    const user = await (async (name) => {
      if (/<[@!](.+)>/.test(name)) {
        const uid = name.match(/<[@!](.+)>/)[1];
        return await p(bot.api.users.info)({user: uid});
      } else {
        return (await p(bot.api.users.list)({})).members.find(m => m.name === name);
      }
    })(name);

    bot.reply(msg, '```' + JSON.stringify(user, null, 2) + '```');
  });

  controller.hears('chinfo #?(.+)', ['direct_message', 'direct_mention', 'ambient'], async (bot, msg) => {
    const team = msg.team;
    const name = msg.match[1].match(/<#(.+)\|.+>/)[1];
    bot.reply(msg, `slack://channel?team=${team}&id=${name}`)
  })
};
