'use strict';

const fetch = require('isomorphic-fetch');
const debug = require('util').debuglog('jira-ticket-title');

const jiraTicketTitle = async (controller, option) => {

  const config = option.jiraTicketTitle;
  const match = `${config.baseUrl}/browse/(.+)-(\\d+)`;
  const user = config.user;
  const password = config.password;

  controller.hears(match, ['ambient'], async (bot, msg) => {

    const project = msg.match[1];
    const number = msg.match[2];
    const issue = `${project.toUpperCase()}-${number}`;
    debug(issue);

    const auth = Buffer.from(`${user}:${password}`).toString('base64');
    const res = await fetch(`${config.baseUrl}/rest/api/2/issue/${issue}`, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    const body = await res.json();

    switch (res.status) {
      case 404:
        console.error(`statusCode:${res.status}\tstatusMessage:${res.statusText}\tmessages:${body.errorMessages.join(',')}`);
        break;
      case 200:
        bot.reply(msg, `<${config.baseUrl}/browse/${issue}|*${issue}*>: ${body.fields.summary}`);
        break;
      default:
        console.error(`statusCode:${res.status}\tstatusMessage:${res.statusText}\tmessages:${body.errorMessages.join(',')}`);
        break;
    }
  });
};

module.exports = jiraTicketTitle;
