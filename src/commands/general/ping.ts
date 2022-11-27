import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command";

export = new Command(new SlashCommandBuilder().setName("ping").setDescription("Ping "), (_client, interaction) => {
  interaction.followUp({ content: "dev" });
});
