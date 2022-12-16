import { Client } from "discord.js";
import { ClientEvent } from "../../structures/Event";
import loggerService from "../../services/logger.service";

const logger = loggerService;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export = new ClientEvent("ready", async (client: Client) => {
  const { user } = client;
  logger.info({
    message: "bot logged in",
    user,
  });
});
