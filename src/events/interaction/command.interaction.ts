import { Interaction } from "discord.js";
import Client from "../../structures/Client";
import { ClientEvent } from "../../structures/Event";

export = new ClientEvent("interactionCreate", async (client: Client, interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  const command = client.commands.get(commandName);
  if (!command) {
    return;
  }

  await interaction.deferReply();
  await client.runCommand(command, interaction);
});
