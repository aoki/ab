'use strict';

const Botkit = require('botkit');
const chalk = require('chalk');

const fs = require('fs');
const path = require('path');

process.on('unhandledRejection', console.dir);

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

const plugins = path.resolve(__dirname, 'plugins');
console.log(__dirname);
console.log(plugins);
fs.readdir(plugins, (err, list) => {
  for (const file of list) {
    const plugin = path.resolve(plugins, file);
    console.log(chalk.green(`Load ${file}`));
    require(plugin)(controller);
  }
});
