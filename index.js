'use strict';

const Botkit = require('botkit');
const chalk = require('chalk');
const packageInfo = require('./package');

const fs = require('fs');
const path = require('path');
const checkEnv = require('check-env');

process.on('unhandledRejection', console.dir);

checkEnv([
  'AB_SLACK_API_TOKEN',
  'HUBOT_CONFLUENCE_USER',
  'HUBOT_CONFLUENCE_USER',
  'HUBOT_CONFLUENCE_USER',
  'HUBOT_JIRA_USER',
  'HUBOT_JIRA_PASSWORD',
  'HUBOT_JIRA_URL'
]);

const config = {
  "hello": {
    "version": packageInfo.version
  },
  "confluencePageTitle": {
    "user":  process.env.HUBOT_CONFLUENCE_USER,
    "password": process.env.HUBOT_CONFLUENCE_PASSWORD,
    "baseUrl": process.env.HUBOT_CONFLUENCE_URL
  },
  "jiraTicketTitle": {
    "user":  process.env.HUBOT_JIRA_USER,
    "password": process.env.HUBOT_JIRA_PASSWORD,
    "baseUrl": process.env.HUBOT_JIRA_URL
  }
};

const controller = Botkit.slackbot({
  debug: process.env.NODE_DEBUG ? process.env.NODE_DEBUG.split(',').includes('botkit') : undefined
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

const plugins = path.resolve(__dirname, 'plugins');
console.log(__dirname);
console.log(plugins);
fs.readdir(plugins, (err, list) => {
  for (const file of list) {
    const plugin = path.resolve(plugins, file);
    console.log(chalk.green(`Load ${file}`));
    require(plugin)(controller, config);
  }
});
