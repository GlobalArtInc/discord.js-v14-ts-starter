import {
  CacheType,
  Client as DiscordClient,
  Collection,
  CommandInteraction,
  IntentsBitField,
  Partials,
  REST,
  Routes,
} from "discord.js";
import { readdirSync } from "fs";
import { Command } from "./Command";
import { IBaseEvent } from "./Event";
import { Database } from "./Database";
import LoggerService from "../services/logger.service";
export default class Client extends DiscordClient {
  public devMode = process.env.DEPLOY_ENV === "dev";
  public database = new Database();
  public commands: Collection<string, Command> = new Collection<string, Command>();
  public readonly basePath = `${__dirname}/..`;

  constructor() {
    super({
      partials: [Partials.Channel],
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildBans,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildIntegrations,
        IntentsBitField.Flags.GuildWebhooks,
        IntentsBitField.Flags.GuildInvites,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
      ],
      allowedMentions: { repliedUser: false },
    });
  }

  async init() {
    this.database.init();
    this.loadEvents();
    this.loadCommands();
  }

  private loadEvents() {
    readdirSync(`${this.basePath}/events`).forEach((folder) => {
      const files = readdirSync(`${this.basePath}/events/${folder}`).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js")
      );

      if (files.length > 0) {
        files.forEach((file) => {
          const event: IBaseEvent = require(`${this.basePath}/events/${folder}/${file}`);
          event.bindToEventEmitter(this);
        });
      }
    });
  }

  private loadCommands() {
    readdirSync(`${this.basePath}/commands`).forEach((folder) => {
      const files = readdirSync(`${this.basePath}/commands/${folder}`).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js")
      );
      if ((folder !== "dev" || this.devMode) && files.length > 0) {
        files.forEach((file) => {
          const command: Command = require(`${this.basePath}/commands/${folder}/${file}`);
          command.category = folder;
          this.commands.set(command.builder?.name, command);
        });
      }
    });
  }

  async registerCommands() {
    const commandDataArr = this.commands.map((command) => command.builder.toJSON());
    const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

    try {
      LoggerService.info({
        message: "Registering commands with DiscordAPI",
      });

      if (!this.devMode) {
        LoggerService.info({
          message: "Registering to any server this bot is in",
        });
        const fullRoute = Routes.applicationCommands(this.user.id);

        rest.put(fullRoute, {
          body: commandDataArr,
        });
      } else {
        LoggerService.info({
          message: `Only registering in guild with "DISCORD_SERVER_ID" environment variable`,
        });
        if (!process.env.DISCORD_SERVER_ID) throw "DISCORD_SERVER_ID environment variable was not set!";
        const fullRoute = Routes.applicationGuildCommands(this.user.id, process.env.DISCORD_SERVER_ID);

        rest.put(fullRoute, {
          body: commandDataArr,
        });
      }
    } catch (message) {
      LoggerService.error({
        message,
      });
    }
  }

  async runCommand(command: Command, interaction: CommandInteraction<CacheType>): Promise<void> {
    const guild = interaction.guild?.name || "NO GUILD";
    try {
      await command.run(this, interaction);
      const params = {};

      if (interaction.options["_hoistedOptions"]) {
        for (const option of interaction.options["_hoistedOptions"]) {
          params[option.name] = option.value;
        }
      }
      const { user } = interaction;

      LoggerService.interaction({
        guild,
        user: `${user.tag}`,
        command: command.builder.name,
        params,
      });
    } catch (message) {
      LoggerService.error({ message });
      await interaction.followUp({
        content: `There was an error while executing the \`${command.builder.name}\` command!`,
      });
    }
  }

  async start(): Promise<void> {
    await this.init();
    await this.registerCommands();
    await this.login(process.env.DISCORD_TOKEN);
  }
}
