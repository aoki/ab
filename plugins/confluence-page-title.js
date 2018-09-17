'use strict';

const osmosis = require('osmosis');
const debug = require('util').debuglog('confluence-page-title');

/**
 *  restricted: Read OR Write restricted
 *  aui-iconfont-locked: Read AND Write restricted
 *  aui-iconfont-unlocked: Public
 */
const confluencePageTitle = async (controller, option) => {

  const config = option.confluencePageTitle;
  const matchUrl = `${config.baseUrl}/[^\\s>]+`;
  const user = config.user;
  const password = config.password;

  controller.hears(matchUrl, ['ambient'], (bot, msg) => {

    osmosis.get(msg.match[0])
      .login(user, password)
      .set({
        'title': 'title',
        'restrictionText': '#content-metadata-page-restrictions@title',
        'restrictionClass': '#content-metadata-page-restrictions@class',
      }).data(d => {
      debug(d.title);
      if (d.restrictionClass.split(' ').includes('aui-iconfont-unlocked')) {
        bot.reply(msg, d.title);
      } else {
        debug(`Restricted page ${d.title}`);
        bot.reply(msg, 'This page *RESTRICTED* for read or write :cry:');
      }
    });
  });
};

module.exports = confluencePageTitle;
