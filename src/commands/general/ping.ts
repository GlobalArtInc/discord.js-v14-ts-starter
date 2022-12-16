import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import Client from "../../structures/Client";

export = new Command(
  new SlashCommandBuilder().setName("ping").setDescription("Ping "),
  (_client: Client, interaction: CommandInteraction) => {
    interaction.followUp({ content: "dev" });
  }
);
