import {
  AutocompleteInteraction,
  ButtonInteraction,
  Client,
  CommandInteraction,
  Events,
  Interaction,
  RateLimitData,
  RESTEvents,
} from 'discord.js';
import { createRequire } from 'node:module';
import { CommandHandler } from '../events/command-handler.js';

// import {
//   ButtonHandler,
//   CommandHandler,
//   GuildJoinHandler,
//   GuildLeaveHandler,
//   MessageHandler,
//   ReactionHandler,
// } from '../events/index.js';
import { Logger } from '../services/index.js';
// import { PartialUtils } from '../utils/index.js';

const require = createRequire(import.meta.url);
let Config = require('../../config/config.json');
let Debug = require('../../config/debug.json');
let Logs = require('../../config/logs.json');

export class Bot {
  private ready = false;

  constructor(
    private token: string,
    private client: Client,
    private commandHandler: CommandHandler,
  ) {}

  public async start(): Promise<void> {
    this.registerListeners();
    await this.login(this.token);
  }

  private registerListeners(): void {
    this.client.on(Events.ClientReady, () => this.onReady());
    this.client.on(
      Events.ShardReady,
      (shardId: number, unavailableGuilds: Set<string>) =>
        this.onShardReady(shardId, unavailableGuilds),
    );
    this.client.on(Events.InteractionCreate, (intr: Interaction) =>
      this.onInteraction(intr),
    );
    this.client.rest.on(
      RESTEvents.RateLimited,
      (rateLimitData: RateLimitData) => this.onRateLimit(rateLimitData),
    );
  }

  private async login(token: string): Promise<void> {
    try {
      await this.client.login(token);
    } catch (error) {
      Logger.error(Logs.error.clientLogin, error);
      return;
    }
  }

  private async onReady(): Promise<void> {
    let userTag = this.client.user?.tag;
    Logger.info(Logs.info.clientLogin.replaceAll('{USER_TAG}', userTag));

    this.ready = true;
    Logger.info(Logs.info.clientReady);
  }

  private onShardReady(shardId: number, _unavailableGuilds: Set<string>): void {
    Logger.setShardId(shardId);
  }

  private async onInteraction(intr: Interaction): Promise<void> {
    if (
      !this.ready ||
      (Debug.dummyMode.enabled &&
        !Debug.dummyMode.whitelist.includes(intr.user.id))
    ) {
      return;
    }

    if (
      intr instanceof CommandInteraction ||
      intr instanceof AutocompleteInteraction
    ) {
      try {
        await this.commandHandler.process(intr);
      } catch (error) {
        Logger.error(Logs.error.command, error);
      }
    } else if (intr instanceof ButtonInteraction) {
      // try {
      //   await this.buttonHandler.process(intr);
      // } catch (error) {
      //   Logger.error(Logs.error.button, error);
      // }
    }
  }

  private async onRateLimit(rateLimitData: RateLimitData): Promise<void> {
    if (
      rateLimitData.timeToReset >=
      Config.logging.rateLimit.minTimeout * 1000
    ) {
      Logger.error(Logs.error.apiRateLimit, rateLimitData);
    }
  }
}