'use strict';

// Utils
const { logError } = require('./utils/log');

/**
 * @type {Telegraf}
 * Bot
 */
const bot = require('./bot');
const appName = process.env.PROJECT_NAME
const appPort = process.env.PORT

bot.telegram.getMe().then((botInfo) => {
	bot.options.username = botInfo.username;
	bot.context.botInfo = botInfo;
});

bot.use(
	require('./handlers/middlewares'),
	require('./handlers/messages'),
	require('./plugins'),
	require('./handlers/commands'),
	require('./handlers/regex'),
	require('./handlers/unmatched'),
);


bot.catch(logError);

bot.telegram.setWebhook(`https://${appName}.glitch.me/webhook`)
console.log(`Bot sudah Aktif dan siap menerima pesan.`)
bot.startWebhook('/webhook', null, appPort)