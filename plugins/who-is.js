'use strict';

const p = require('util').promisify;

module.exports = controller => {
  controller.hears('who is @?(.+)', ['direct_message', 'direct_mention'], async (bot, msg) => {
    const name = msg.match[1];
    const user = await (async (name) => {
      if (/<@(.+)>/.test(name)) {
        const uid = name.match(/<@(.+)>/)[1];
        return await p(bot.api.users.info)({user: uid});
      } else {
        return (await p(bot.api.users.list)({})).members.find(m => m.name === name);
      }
    })(name);

    bot.reply(msg, '```' + JSON.stringify(user, null, 2) + '```');
  });
};
