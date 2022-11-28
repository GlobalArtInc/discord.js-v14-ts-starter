import { Client } from "discord.js";
import LoggerService from "../../services/logger.service";
import { ClientEvent } from "../../structures/Event";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export = new ClientEvent("ready", async (_client: Client) => {
  process.on("uncaughtException", function (error) {
    LoggerService.error({ error });
  });

  process.on("unhandledRejection", (error) => {
    LoggerService.error({ error });
  });
});
