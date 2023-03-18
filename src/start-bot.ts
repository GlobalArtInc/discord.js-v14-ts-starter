import { Options, Partials } from 'discord.js';
import { REST } from '@discordjs/rest';
import { createRequire } from 'node:module';

import { CustomClient } from './extensions/index.js';
import { Bot } from './models/bot.js';
import {
  CommandRegistrationService,
  EventDataService,
  Logger,
} from './services/index.js';
import { ChatCommandMetadata, Command } from './commands/index.js';
import { CommandHandler } from './events/index.js';

const require = createRequire(import.meta.url);
let Config = require('../config/config.json');
let Logs = require('../config/logs.json');

async function start(): Promise<void> {
  // Services
  let eventDataService = new EventDataService();

  let client = new CustomClient({
    intents: Config.client.intents,
    partials: (Config.client.partials as string[]).map(
      (partial) => Partials[partial],
    ),
    makeCache: Options.cacheWithLimits({
      // Keep default caching behavior
      ...Options.DefaultMakeCacheSettings,
      // Override specific options from config
      ...Config.client.caches,
    }),
  });

  let commands: Command[] = [];
  let commandHandler = new CommandHandler(commands, eventDataService);
  let bot = new Bot(Config.client.token, client, commandHandler);

  if (process.argv[2] == 'commands') {
    try {
      let rest = new REST({ version: '10' }).setToken(Config.client.token);
      let commandRegistrationService = new CommandRegistrationService(rest);
      let localCmds = [
        ...Object.values(ChatCommandMetadata).sort((a, b) =>
          a.name > b.name ? 1 : -1,
        ),
      ];
      await commandRegistrationService.process(localCmds, process.argv);
    } catch (error) {
      Logger.error(Logs.error.commandAction, error);
    }
    // Wait for any final logs to be written.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.exit();
  }

  bot.start();
}

process.on('unhandledRejection', (reason, _promise) => {
  Logger.error(Logs.error.unhandledRejection, reason);
});

start().catch((error) => {
  Logger.error(Logs.error.unspecified, error);
});
